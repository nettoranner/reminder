from datetime import timedelta

from fastapi import APIRouter, HTTPException, status

import reminder.crud as crud
from reminder.core.config import settings
from reminder.core.database import SessionDep
from reminder.core.security import create_access_token
from reminder.models import LoginRequest, TokenResponse, UserCreate, UserPublic

router = APIRouter(tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(
    form_data: LoginRequest,
    session: SessionDep
) -> TokenResponse:
    user = crud.authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return TokenResponse(access_token=access_token, token_type="bearer")


@router.post("/signup", response_model=UserPublic)
def register_user(user_create: UserCreate, session: SessionDep):
    user = crud.get_user_by_username(session, user_create.username)  #FIXME: unresolved-attribute
    if user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    return crud.create_user(session, user_create)