from functools import lru_cache
from urllib.parse import urlsplit

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Adticks"
    environment: str = "development"
    api_prefix: str = "/api/v1"
    backend_public_url: str = "http://127.0.0.1:8000"
    frontend_public_url: str = "http://127.0.0.1:3000"
    frontend_marketing_url: str = "http://127.0.0.1:3000"
    frontend_app_origins: str = ""
    app_secret_key: str = Field(default="dev-only-change-me", min_length=16)
    database_url: str = "sqlite:///./adticks.db"
    redis_url: str = "redis://127.0.0.1:6379/0"
    celery_broker_url: str = "redis://127.0.0.1:6379/1"
    celery_result_backend: str = "redis://127.0.0.1:6379/2"
    google_client_id: str = ""
    google_client_secret: str = ""
    google_oauth_redirect_path: str = "/api/v1/auth/google/callback"
    session_cookie_name: str = "adticks_session"
    session_cookie_domain: str = ""
    session_max_age_seconds: int = 60 * 60 * 24 * 14

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def google_redirect_uri(self) -> str:
        return f"{self.backend_public_url}{self.google_oauth_redirect_path}"

    @property
    def session_cookie_domain_value(self) -> str | None:
        return self.session_cookie_domain or None

    @property
    def app_origins(self) -> list[str]:
        origins = [self.frontend_public_url, *self._split_origins(self.frontend_app_origins)]
        return self._unique_origins(origins)

    @property
    def cors_origins(self) -> list[str]:
        return self._unique_origins([self.frontend_marketing_url, *self.app_origins])

    def safe_auth_return_url(self, return_to: str | None) -> str:
        if not return_to:
            return self.frontend_public_url.rstrip("/")

        parsed = urlsplit(return_to)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            return self.frontend_public_url.rstrip("/")

        origin = f"{parsed.scheme}://{parsed.netloc}".rstrip("/")
        if origin not in self.app_origins:
            return self.frontend_public_url.rstrip("/")

        path = parsed.path or "/"
        query = f"?{parsed.query}" if parsed.query else ""
        return f"{origin}{path}{query}"

    @staticmethod
    def _split_origins(value: str) -> list[str]:
        return [origin.strip() for origin in value.split(",") if origin.strip()]

    @staticmethod
    def _unique_origins(origins: list[str]) -> list[str]:
        normalized = [origin.rstrip("/") for origin in origins if origin]
        return list(dict.fromkeys(normalized))


@lru_cache
def get_settings() -> Settings:
    return Settings()
