# Use uma imagem base oficial do Python
FROM python:3.9-slim

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo de dependências primeiro para aproveitar o cache do Docker
COPY requirements.txt requirements.txt

# Instale as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta em que o FastAPI estará rodando (Uvicorn padrão é 8000)
EXPOSE 8000

# Rodando com Uvicorn, permitindo acesso de qualquer host dentro da rede Docker
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]