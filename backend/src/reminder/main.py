from fastapi import FastAPI

from reminder.core.database import create_db_and_tables
from reminder.routers import auth, user

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(auth.router)
app.include_router(user.router)