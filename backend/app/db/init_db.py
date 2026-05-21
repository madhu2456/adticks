from app.db.base import Base
from app.db.session import engine
from app.models import audit, project, user


def init_db() -> None:
    _ = (audit, project, user)
    Base.metadata.create_all(bind=engine)
