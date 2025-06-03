# backend/src/core/config.py
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "CodeShift"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    SECRET_KEY: str

    # Database
    MONGODB_URI: str
    MONGODB_DB_NAME: str = "codeshift"

    # GitHub OAuth
    GITHUB_CLIENT_ID: str
    GITHUB_CLIENT_SECRET: str
    GITHUB_REDIRECT_URI: str

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # AI Services
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None

    # Frontend
    FRONTEND_URL: str = "http://localhost:3000"

    # JWT
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24 * 7  # 1 week

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
