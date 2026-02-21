from typing import Annotated
from sqlmodel import Field, select

from fastapi import FastAPI, HTTPException
from src.core.models import UserCreate, UserPublic, User
from src.core.database import SessionDep, create_db_and_tables


app = FastAPI()


@app.get("/")
def hello_world():
    return {"message": "Hello, World!"}


@app.post("/user/", response_model=UserPublic)
def create_user(user: UserCreate, session: SessionDep):
    """Create a new user"""
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@app.get("/user/", response_model=list[UserPublic])
def read_users(session: SessionDep, offset: int = 0, limit: Annotated[int, Field(gt=0, le=100)] = 100):
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users


@app.get("/user/{user_id}", response_model=UserPublic)
def read_user(user_id: int, session: SessionDep):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user