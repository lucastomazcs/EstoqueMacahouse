from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db" #Usando sql lite

#criando o banco e a engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread":False})

#Sessão onde são feitas as consultas no banco de dados
SessionLocal = sessionmaker(autocommit = False, autoflush= False, bind=engine)

#A base de todas as classes de modelos do SQLAlchemy
Base= declarative_base()

#Função onde retorna a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()