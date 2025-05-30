import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

# URL do seu banco PostgreSQL
URL_DATABASE = os.getenv('DATABASE_URL', 'postgresql://postgres:Teste1234@localhost:5432/estoqueMacahouse')
# Cria engine e session
engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()

# ✅ Função que o FastAPI precisa para usar o banco (estava faltando)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
