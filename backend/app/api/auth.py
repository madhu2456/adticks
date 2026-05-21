from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.config import get_settings
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import UserProfile
from app.services.oauth import oauth
from app.services.security import create_session_token

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()


@router.get("/google/login")
async def google_login(request: Request):
    if not settings.google_client_id or not settings.google_client_secret:
        raise HTTPException(status_code=503, detail="Google OAuth is not configured")
    return await oauth.google.authorize_redirect(request, settings.google_redirect_uri)


@router.get("/google/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")
    if not user_info:
        user_info = await oauth.google.userinfo(token=token)

    email = user_info.get("email")
    google_subject = user_info.get("sub")
    if not email or not google_subject:
        raise HTTPException(status_code=400, detail="Google profile is missing email or subject")

    user = db.scalar(select(User).where(User.google_subject == google_subject))
    if not user:
        user = User(
            email=email,
            google_subject=google_subject,
            name=user_info.get("name", ""),
            avatar_url=user_info.get("picture", ""),
        )
        db.add(user)
    else:
        user.email = email
        user.name = user_info.get("name", user.name)
        user.avatar_url = user_info.get("picture", user.avatar_url)
    db.commit()
    db.refresh(user)

    response = RedirectResponse(url=f"{settings.frontend_public_url}/app")
    response.set_cookie(
        key=settings.session_cookie_name,
        value=create_session_token(user.id),
        httponly=True,
        secure=settings.environment == "production",
        samesite="lax",
        max_age=settings.session_max_age_seconds,
    )
    return response


@router.get("/me", response_model=UserProfile)
def me(current_user: User = Depends(get_current_user)):
    return UserProfile(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        avatar_url=current_user.avatar_url,
    )


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(settings.session_cookie_name)
    return {"ok": True}
