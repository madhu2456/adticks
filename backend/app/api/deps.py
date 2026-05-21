from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.session import get_db
from app.models.user import User
from app.services.security import read_session_token

settings = get_settings()


def get_current_user(
    session_token: str | None = Cookie(default=None, alias=settings.session_cookie_name),
    db: Session = Depends(get_db),
) -> User:
    user = get_optional_current_user(session_token=session_token, db=db)
    if user:
        return user
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")


def get_optional_current_user(
    session_token: str | None = Cookie(default=None, alias=settings.session_cookie_name),
    db: Session = Depends(get_db),
) -> User | None:
    if not session_token:
        return None
    user_id = read_session_token(session_token)
    if not user_id:
        return None

    user = db.get(User, user_id)
    if not user or not user.is_active:
        return None
    return user
