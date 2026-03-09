from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from reminder.api.routers import auth, user
from reminder.core.config import settings
from reminder.core.database import create_db_and_tables

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)