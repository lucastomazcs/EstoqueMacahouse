# Estágio de Build
FROM node:18-alpine as build

WORKDIR /app

# Copie package.json e package-lock.json
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Construa a aplicação para produção
RUN npm run build

# Estágio de Produção (servir com Nginx)
FROM nginx:alpine

# Copie os arquivos construídos do estágio de build para o diretório padrão do Nginx
# O build do Vite geralmente cria uma pasta 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Copie uma configuração personalizada do Nginx para lidar com SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponha a porta 80 (porta padrão do Nginx)
EXPOSE 80

# O comando padrão do Nginx já é para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]