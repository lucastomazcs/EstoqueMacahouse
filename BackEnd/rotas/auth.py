from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter()

@router.post("/login")

def login (user: schemas.UserCreate, db:Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Usuario não cadastrado")
    if db_user.name != user.name:
        raise HTTPException(status_code=400, detail="Senha Invalida")
    return {"message": "Login realizado com sucesso", "user": db_user.name}