
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from contextlib import contextmanager

#Editar conforme dito abaixo vvvvvvvvv
URL_DATABASE = 'postgresql://postgres:Teste1234@localhost:5432/estoqueMacahouse'
#URL_DATABASE = 'postgresql://[usuario do seu banco]:[senha do usuario]@localhost:5432/[nome do banco criado]
#Após isso abrir pgadmin e criar um banco com o mesmo nome descrito aqui ---------------^^^^^^^^^^^^^^^^

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()