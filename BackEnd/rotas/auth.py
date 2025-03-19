# rotas/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
import bcrypt

router = APIRouter()

@router.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()  # Altere "email" para "username"
    if not db_user:
        raise HTTPException(status_code=400, detail="Usuário não encontrado")
    
    # Verificar a senha usando bcrypt
    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Senha inválida")
    
    return {"message": "Login realizado com sucesso", "user": db_user.name}

@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()  # Altere "email" para "username"
    if db_user:
        raise HTTPException(status_code=400, detail="Username já cadastrado")

    # Criptografando a senha
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Criando o novo usuário
    new_user = models.User(username=user.username, name=user.name, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "Usuário cadastrado com sucesso", "user": new_user.name}
