from pydantic import BaseModel

<<<<<<< Updated upstream
class UserCreate(BaseModel):
    username: str
    password = str

class User(BaseModel):
    id: int
    username: str
    

    class Config:
        orm_mode = True
=======
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str
>>>>>>> Stashed changes
