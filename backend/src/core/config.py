from src.core.settings.settings import EnvSettings
from pydantic import Field


class DatabaseSettings(EnvSettings):
    database_uri: str = Field(default="postgresql+psycopg://postgres:password@postgres-db:5432", alias="DATABASE_URI")


settings = DatabaseSettings()