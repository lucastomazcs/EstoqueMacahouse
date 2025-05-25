from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated, Optional
import uvicorn
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import schemas
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from rotas import estoque

#Configurações de criptografia
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

app = FastAPI(debug=True)

#seta origins de que endereço serão aceitas requisições
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#cria tabelas no banco de dados
models.Base.metadata.create_all(bind=engine)


app.include_router(estoque.router)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
#fix datetime.utcnow()
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#fix datetime.utcnow()
def create_refresh_token(data: dict):
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

#endpoint do cadastro
@app.post("/register/")
async def register_user(user: schemas.UserCreate, db: db_dependency):
    #criptografa a senha para guarda-la no banco de dados
    hashed_password = pwd_context.hash(user.password)
    db_user = models.Users(usuarioNome=user.name, usuarioEmail=user.email, usuarioSenha=hashed_password)
    #apos receber do form os dados da commit e add no banco e o atualiza
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully"}

#endpoint do login
@app.post("/login/")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    #checa para o primeiro usuario que tem o mesmo email que o inserido
    user = db.query(models.Users).filter(models.Users.usuarioEmail == form_data.username).first()
    #acredito eu que isso verifica se a senha bate com o usuario se n da credencial invalida
    if not user or not pwd_context.verify(form_data.password, user.usuarioSenha):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais Invalidas")
    #cria token de acesso e token para dar refresh caso nao queira que expire ex: usuario está na página ainda mechendo
    access_token = create_access_token({"sub": user.usuarioEmail}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_refresh_token({"sub": user.usuarioEmail})
    user.refresh_token = refresh_token
    db.commit()
    return {"access_token": access_token, "refresh_token": refresh_token}

#endpoint para atualizar token de acesso
@app.post("/refresh/")
async def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        user = db.query(models.Users).filter(models.Users.usuarioEmail == user_email).first()
        if not user or user.refresh_token != refresh_token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
        
        new_access_token = create_access_token({"sub": user.usuarioEmail}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        return {"access_token": new_access_token}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

#endpoint para realizar logout
@app.post("/logout/")
async def logout(user_email: str, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.usuarioEmail == user_email).first()
    if user:
        user.refresh_token = None
        db.commit()
    return {"message": "User logged out"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
