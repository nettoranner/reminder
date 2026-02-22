from sqlmodel import Field, select, SQLModel


class UserBase(SQLModel):
    name: str = Field(index=True)
    email: str = Field(index=True)


class User(UserBase, table=True):
    """Here will be ORM models for database tables"""
    id: int | None = Field(default=None, primary_key=True)
    username: str
    hashed_password: str

class UserPublic(UserBase):
    id: int


class UserCreate(UserBase):
    username: str = Field(..., min_length=5, max_length=20)
    password: str = Field(min_length=8)


class UserUpdate(UserBase):
    name: str | None = None
    email: str | None = None
    username: str | None = Field(None, min_length=5, max_length=20)


class UserAuth(UserBase):
    hashed_password: str