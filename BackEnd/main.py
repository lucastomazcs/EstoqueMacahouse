from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
import uvicorn
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import schemas

app = FastAPI(debug=True)

models.Base.metadata.create_all(bind=engine)

class UserBase(BaseModel):
    id: int
    name: str
    login: str
    email: str
    password: str

class UsersBase(BaseModel):
    users: List[UserBase]

class Vendas(BaseModel):
    id: int
    nomeCliente: str
    item: str
    quantidade: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/usuarios/", response_model=schemas.User)
async def register_users(usuario: schemas.UserCreate, db: db_dependency):
    db_usuario = models.Users(usuarioNome=usuario.name, usuarioEmail=usuario.email, usuarioSenha=usuario.password)
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)

    for venda in usuario.vendas:
        db_venda = models.Vendas(nomeCliente=venda.nomeCliente, item=venda.item, quantidade=venda.quantidade, idVendedor=db_usuario.id)
        db.add(db_venda)
    db.commit()
    return schemas.User(id=db_usuario.id, name=db_usuario.usuarioNome, email=db_usuario.usuarioEmail)

# memory_db = {"jonas": []}  

# @app.get("/jonas", response_model=Users)
# def get_users():
#     return Users(users=memory_db["jonas"]) 

# @app.post("/jonas", response_model=User)
# def add_user(user: User):
#     memory_db["jonas"].append(user)
#     return user  

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
