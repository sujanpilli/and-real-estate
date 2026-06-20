from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from backend.app.core.config import settings

if settings.DATABASE_URL.startswith("sqlite"):
    engine = create_async_engine(settings.DATABASE_URL, echo=True)
else:
    # Production connection settings for Neon serverless PostgreSQL
    connect_args = {}
    if "postgresql" in settings.DATABASE_URL:
        connect_args["ssl"] = True
        
    engine = create_async_engine(
        settings.DATABASE_URL,
        echo=True,
        pool_pre_ping=True,
        pool_recycle=300,
        connect_args=connect_args
    )

async_session = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with async_session() as session:
        yield session
