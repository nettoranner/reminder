from reminder.core.settings.settings import EnvSettings
from pydantic import Field


class Settings(EnvSettings):
    database_uri: str = Field(default="postgresql+psycopg://postgres:password@postgres-db:5432", alias="DATABASE_URI")

    #jwt settings
    secret_key: str | None = Field(default=None, alias="SECRET_KEY")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

settings = Settings()