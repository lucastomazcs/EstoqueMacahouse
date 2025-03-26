
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from contextlib import contextmanager

URL_DATABASE = 'postgresql://postgres:Teste1234@localhost:5432/estoqueMacahouse'
#URL_DATABASE = 'postgresql://[usuario do seu banco]:[senha do usuario]@localhost:5432/[nome do banco criado]

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db" 

# engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

# @contextmanager
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()