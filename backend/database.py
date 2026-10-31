"""Database configuration for FastAPI backend.

Creates a SQLite database using SQLAlchemy's declarative base.
Provides a session factory for request handling.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

SQLITE_DB_PATH = "sqlite:///./osfic.db"

engine = create_engine(
    SQLITE_DB_PATH, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

