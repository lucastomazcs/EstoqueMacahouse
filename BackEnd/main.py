from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from rotas import auth 
from database import get_db 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root(db: Session = Depends(get_db)):
    return {"message": "Conectado ao banco de dados com sucesso!"}

@app.get("/hello")
def read_hello():
    return {"message": "Hello, FastAPI!"}
app.include_router(auth.router)