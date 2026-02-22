from fastapi import APIRouter, HTTPException

import reminder.crud as crud
from reminder.core.database import SessionDep
from reminder.core.deps import CurrentUser
from reminder.core.models import UserCreate, UserPublic, UserUpdate

router = APIRouter(prefix="/user", tags=["users"])

@router.post("/signup", response_model=UserPublic)
def register_user(user_create: UserCreate, session: SessionDep):
    user = crud.get_user_by_username(session, user_create.username)
    if user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    return crud.create_user(session, user_create)


@router.get("/me", response_model=UserPublic)
def read_current_user(current_user: CurrentUser):
    return current_user


@router.get("/{user_id}", response_model=UserPublic)
def read_user_by_id(user_id: int, session: SessionDep):
    user_by_id = crud.get_user_by_id(session, user_id)
    if not user_by_id:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user_by_id


@router.patch("/{user_id}", response_model=UserPublic)
def update_user_by_id(user_id: int, user_update: UserUpdate, session: SessionDep, current_user: CurrentUser):
    user_db = crud.get_user_by_id(session, user_id)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    return crud.update_user(session, user_id)