import uuid
from decimal import Decimal

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

#FIXME: Refactor all models classes. Divine public and private models

class UserBase(SQLModel):
    name: str = Field(index=True)
    email: EmailStr = Field(unique=True, index=True, max_length=255)


# Base User class
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str
    hashed_password: str
    items: list[Finance] = Relationship(back_populates="owner", cascade_delete=True)


# Properties to recieve via API on Creation
class UserCreate(UserBase):
    password: int = Field(min_length=8, max_length=128)


class UserRegister(SQLModel):
    username: str = Field(unique=True, min_length=5, max_length=32)
    password: str = Field(min_length=8, max_length=128)


class UserPublic(UserBase):
    id: uuid.UUID


# Properties to recieve via API on Update
class UserUpdate(UserBase):
    username: str | None = Field(default=None, min_length=5, max_length=32)
    password: str | None = Field(default=None, min_length=8, max_length=128)
    email: EmailStr | None = Field(default=None, max_length=255)


class UserUpdateMe(SQLModel):
    username: str | None = Field(default=None, min_length=5, max_length=32)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    password: str | None = Field(default=None, min_length=8, max_length=128)


# Properties to recieve via API on Finance Data
class FinanceBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)


class Finance(FinanceBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")


class FinancePublic(FinanceBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class FinanceTotal(FinanceBase):
    amount: Decimal
    currency: str


class FinanceSpent(FinanceBase):
    amount: Decimal
    currency: str


class LoginRequest(SQLModel):
    username: str
    password: str


class TokenResponse(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    username: str | None = None


class RegisterRequest(SQLModel):
    email: EmailStr
    password: str
    full_name: str