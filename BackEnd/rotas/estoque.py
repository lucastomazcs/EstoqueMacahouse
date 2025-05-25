from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from rotas.auth import get_current_user

router = APIRouter(prefix="/estoque", tags=["Estoque"])

@router.get("/", response_model=list[schemas.EstoqueResponse])
def listar_estoque(db: Session = Depends(get_db)):
    return db.query(models.Estoque).all()

@router.post("/", response_model=schemas.EstoqueResponse)
def adicionar_item(
    item: schemas.EstoqueCreate,
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(get_current_user)  # protege rota com autenticação
):
    novo_item = models.Estoque(
        item=item.item,
        quantidade=item.quantidade,
        idAdmin=current_user.id  # pega id do usuário autenticado
    )
    db.add(novo_item)
    db.commit()
    db.refresh(novo_item)
    return novo_item

@router.put("/{item_id}", response_model=schemas.EstoqueResponse)
def atualizar_item(
    item_id: int, 
    item: schemas.EstoqueUpdate, 
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(get_current_user)  # opcional: proteger atualização
):
    item_db = db.query(models.Estoque).filter(models.Estoque.id == item_id).first()
    if not item_db:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    item_db.item = item.item
    item_db.quantidade = item.quantidade
    db.commit()
    return item_db

@router.delete("/{item_id}")
def remover_item(
    item_id: int, 
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(get_current_user)  # opcional: proteger remoção
):
    item_db = db.query(models.Estoque).filter(models.Estoque.id == item_id).first()
    if not item_db:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    db.delete(item_db)
    db.commit()
    return {"ok": True, "message": "Item removido com sucesso"}
