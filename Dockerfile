# Etapa 1: Construção da aplicação React
FROM node:18-alpine AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código da aplicação para o contêiner
COPY . .

# Execute o build da aplicação
RUN npm run build

# Etapa 2: Servir a aplicação (usando um servidor HTTP como o Nginx)
FROM nginx:alpine

# Copie os arquivos de build gerados para o diretório de publicações do Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expor a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
