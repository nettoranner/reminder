from pydantic import Field

from reminder.core.settings import EnvSettings


class Settings(EnvSettings):
    database_uri: str = Field(default="postgresql+psycopg://postgres:password@postgres-db:5432", alias="DATABASE_URI")

    #jwt settings
    secret_key: str | None = Field(default=None, alias="SECRET_KEY")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    allow_origins: list[str] = Field(
        default=[
            "http://localhost",
            "https://localhost",
            "http://localhost:5173"
        ],
        alias="ALLOW_ORIGINS"
    )

settings = Settings()