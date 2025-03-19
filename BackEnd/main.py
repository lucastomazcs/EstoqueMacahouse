# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rotas import auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], #Porta do Vite em dev (Padrão)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

