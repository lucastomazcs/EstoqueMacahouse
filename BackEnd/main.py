from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rotas import auth
from database import engine, Base

app = FastAPI()

# Criação de todas as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Porta do Vite em dev (Padrão)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
