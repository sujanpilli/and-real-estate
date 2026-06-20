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
                # Remove query parameters that asyncpg doesn't support as keyword arguments
                from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
                parsed = urlparse(db_url)
                query_params = parse_qs(parsed.query)
                query_params.pop("sslmode", None)
                query_params.pop("channel_binding", None)
                new_query = urlencode(query_params, doseq=True)
                parsed_list = list(parsed)
                parsed_list[4] = new_query
                cleaned_url = urlunparse(parsed_list)
                
                # Replace protocol with asyncpg equivalent
                if cleaned_url.startswith("postgres://"):
                    cleaned_url = cleaned_url.replace("postgres://", "postgresql+asyncpg://", 1)
                elif cleaned_url.startswith("postgresql://"):
                    cleaned_url = cleaned_url.replace("postgresql://", "postgresql+asyncpg://", 1)
                
                data["DATABASE_URL"] = cleaned_url
        return data

settings = Settings()
