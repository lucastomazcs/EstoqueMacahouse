from pydantic import BaseModel
from typing import List

class VendasBase(BaseModel):
    nomeCliente: str
    item: str
    quantidade: int

class UserCreate(BaseModel):
    name: str
    login: str
    email: str
    password: str
    vendas: List[VendasBase] = []

class User(BaseModel):
    id: int
    usuarioNome: str
    usuarioEmail: str

    class Config:
        orm_mode = True
