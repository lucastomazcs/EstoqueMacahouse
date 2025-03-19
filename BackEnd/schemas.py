from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    name = str
    password = str

class User(BaseModel):
    id: int
    username: str
    name: str

    class Config:
        orm_mode = True