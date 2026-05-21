from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

from app.core.config import get_settings

settings = get_settings()
serializer = URLSafeTimedSerializer(settings.app_secret_key, salt="adticks-auth")


def create_session_token(user_id: str) -> str:
    return serializer.dumps({"sub": user_id})


def read_session_token(token: str) -> str | None:
    try:
        payload = serializer.loads(token, max_age=settings.session_max_age_seconds)
    except (BadSignature, SignatureExpired):
        return None
    subject = payload.get("sub")
    return subject if isinstance(subject, str) else None
