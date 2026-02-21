from sqlmodel import Field, select, SQLModel


class User(SQLModel, table=True):
    """Here will be ORM models for database tables"""
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    email: str 