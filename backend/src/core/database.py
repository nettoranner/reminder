from fastapi import Depends
from sqlalchemy.sql.annotation import Annotated
from sqlmodel import select, create_engine, Session, SQLModel
from .config import settings
from .models import User



engine = create_engine(settings.database_uri)


def create_db_and_tables():
    """ Create database and tables """
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]