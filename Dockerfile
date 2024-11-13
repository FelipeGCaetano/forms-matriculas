# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código da aplicação para o contêiner
COPY . .

# Expor a porta 3000, que é a porta padrão do React
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento React
CMD ["npm", "run", "start"]
