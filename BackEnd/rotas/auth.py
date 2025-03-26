
# from fastapi import APIRouter, HTTPException, Depends

# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from jose import JWTError, jwt
# from datetime import datetime, timedelta
# from database import get_db
# import models, schemas
# import bcrypt

# SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")  # Usando variável de ambiente
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # Funções de hashing e verificação de senha
# def get_password_hash(password: str):
#     return pwd_context.hash(password)

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# # Função para criar o token de acesso JWT
# def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + expires_delta
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# # Função de autenticação do usuário
# def authenticate_user(db, username: str, password: str):
#     user = db.query(User).filter(User.username == username).first()
#     if user is None or not verify_password(password, user.hashed_password):
#         return False
#     return user

# # Criando as rotas de autenticação
# router = APIRouter()

# @router.post("/signup", response_model=UserOut)
# def create_user(user: UserCreate, db: Session = Depends(get_db)):
#     db_user = db.query(User).filter(User.username == user.username).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Usuário já existe")
#     fake_hashed_password = get_password_hash(user.password)
#     db_user = User(username=user.username, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

# @router.post("/login")
# def login_for_access_token(form_data: UserLogin, db: Session = Depends(get_db)):
#     user = authenticate_user(db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(status_code=401, detail="Credenciais inválidas")
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
#     return {"access_token": access_token, "token_type": "bearer"}
# >>>>>>> Stashed changes
