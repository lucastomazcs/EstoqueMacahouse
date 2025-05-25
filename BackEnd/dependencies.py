# dependencies.py

from datetime import datetime, timedelta
from jose import JWTError, jwt

SECRET_KEY = "sua_chave_secreta_aqui"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(username: str, password: str):
    # Aqui você deve colocar a lógica real para verificar o usuário
    # Por exemplo, buscar no banco de dados e comparar senha
    if username == "usuario_teste" and password == "senha_teste":
        return True
    return False
