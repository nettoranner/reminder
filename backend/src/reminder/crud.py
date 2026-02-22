
from fastapi import HTTPException
from sqlmodel import Session, select

from reminder.core.models import User, UserCreate, UserUpdate
from reminder.core.security import get_password_hash, verify_password


def get_user_by_username(session: Session, username: str) -> User | None:
    return session.exec(select(User).where(User.username == username)).first()


def get_user_by_id(session: Session, user_id: int) -> User | None:
    return session.get(User, user_id)


def create_user(session: Session, user_create: UserCreate):
    """Create a new user"""
    hashed_password = get_password_hash(user_create.password)

    user_data = user_create.model_dump(exclude={"password"})
    db_user = User(**user_data, hashed_password=hashed_password)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def update_user(session: Session, user_id: int, user_update: UserUpdate):
    """Update user data"""
    user_db = session.get(User, user_id)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = user_update.model_dump(exclude_unset=True)
    user_db.sqlmodel_update(user_data)

    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db


def delete_user(session: Session, user_id: int):
    """Delete user by id"""
    user_db = session.get(User, user_id)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    session.delete(user_db)
    session.commit()
    return {"OK": True}


def authenticate_user(session: Session, username: str, password: str) -> User | None:
    user = get_user_by_username(session, username)
    if not user:
        verify_password(password, user.hashed_password)  # ty:ignore[unresolved-attribute]
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user