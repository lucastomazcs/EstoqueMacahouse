from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from dependencies import create_access_token, authenticate_user  # Make sure these exist

router = APIRouter()

#Endpoint do login
@router.post("/login")
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    #verifica se usuario existe
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais Invalidas")
    # Se tudo certo, gera e retorna o token de acesso
    access_token_expires = timedelta(minutes=30)  # Token expires in 30 minutes
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,  # Prevent JavaScript access
        secure=False,   # Set True if using HTTPS
        samesite="Lax", # Adjust based on frontend/backend setup
    )

    return {"message": "Login successful"}

@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(response: Response):
    response.delete_cookie("access_token")  # Removes the cookie
    return Response(status_code=status.HTTP_204_NO_CONTENT)
