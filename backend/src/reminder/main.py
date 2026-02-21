from typing import Annotated
from sqlmodel import Field, select

from fastapi import FastAPI, HTTPException
from reminder.core.models import UserCreate, UserPublic, User, UserUpdate
from reminder.core.database import SessionDep, create_db_and_tables


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


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


@app.patch("/user/{user_id}", response_model=UserPublic)
def update_user(user_id: int, user: UserUpdate, session: SessionDep):
    user_db = session.get(User, user_id)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user.model_dump(exclude_unset=True)
    user_db.sqlmodel_update(user_data)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db
