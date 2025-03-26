from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base

class Users(Base):
    __tablename__ = 'usuarios'

    id = Column(Integer, primary_key=True, index=True)
    usuarioNome = Column(String, index=True)
    usuarioEmail = Column(String, index=True)
    usuarioSenha = Column(String, index=True)

class Vendas(Base):
    __tablename__ = 'vendas'

    id = Column(Integer, primary_key=True, index=True)
    idVendedor = Column(Integer, ForeignKey("usuarios.id"))
    nomeCliente = Column(String, index=True)
    item = Column(String, index=True)
    quantidade = Column(Integer, index=True)

# from sqlalchemy import Column, Integer, String
# from database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     email = Column(String, unique=True, index=True)
#     password = Column(String)

#     def __repr__(self):
#         return f"<User(id={self.id}, name={self.name}, email={self.email})>"