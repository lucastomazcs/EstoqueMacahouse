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

    model_config = {
        "from_attributes": True
    }

class EstoqueBase(BaseModel):
    item: str
    quantidade: int

class EstoqueCreate(EstoqueBase):
    idAdmin: int

class EstoqueUpdate(EstoqueBase):
    pass

class EstoqueResponse(EstoqueBase):
    id: int

    model_config = {
        "from_attributes": True
    }
