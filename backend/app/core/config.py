from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Adticks"
    environment: str = "development"
    api_prefix: str = "/api/v1"
    backend_public_url: str = "http://127.0.0.1:8000"
    frontend_public_url: str = "http://127.0.0.1:3000"
    app_secret_key: str = Field(default="dev-only-change-me", min_length=16)
    database_url: str = "sqlite:///./adticks.db"
    redis_url: str = "redis://127.0.0.1:6379/0"
    celery_broker_url: str = "redis://127.0.0.1:6379/1"
    celery_result_backend: str = "redis://127.0.0.1:6379/2"
    google_client_id: str = ""
    google_client_secret: str = ""
    google_oauth_redirect_path: str = "/api/v1/auth/google/callback"
    session_cookie_name: str = "adticks_session"
    session_max_age_seconds: int = 60 * 60 * 24 * 14

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def google_redirect_uri(self) -> str:
        return f"{self.backend_public_url}{self.google_oauth_redirect_path}"


@lru_cache
def get_settings() -> Settings:
    return Settings()
