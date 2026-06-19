from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import model_validator
from typing import Optional, Any

class Settings(BaseSettings):
    PROJECT_NAME: str = "AND Real Estate"
    DATABASE_URL: str = "sqlite+aiosqlite:///./database.sqlite"
    
    SECRET_KEY: str = "secret-key-for-development-only"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    CLOUDINARY_CLOUD_NAME: Optional[str] = None
    CLOUDINARY_API_KEY: Optional[str] = None
    CLOUDINARY_API_SECRET: Optional[str] = None
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @model_validator(mode="before")
    @classmethod
    def assemble_db_url(cls, data: Any) -> Any:
        if isinstance(data, dict):
            db_url = data.get("DATABASE_URL")
            if db_url:
                if db_url.startswith("postgres://"):
                    data["DATABASE_URL"] = db_url.replace("postgres://", "postgresql+asyncpg://", 1)
                elif db_url.startswith("postgresql://"):
                    data["DATABASE_URL"] = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return data

settings = Settings()
