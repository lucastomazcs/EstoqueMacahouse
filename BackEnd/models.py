from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base

class Users(Base):
    __tablename__ = 'usuarios'

    id = Column(Integer, primary_key=True, index=True)
    usuarioNome = Column(String, index=True)
    usuarioEmail = Column(String, unique=True, index=True)
    usuarioSenha = Column(String, index=True)
    refresh_token = Column(String, nullable=True)

class Vendas(Base):
    __tablename__ = 'vendas'

    id = Column(Integer, primary_key=True, index=True)
    idVendedor = Column(Integer, ForeignKey("usuarios.id"))
    nomeCliente = Column(String, index=True)
    item = Column(String, index=True)
    quantidade = Column(Integer, index=True)