# Etapa 1: Imagem base
FROM node:18

# Etapa 2: Diretório de trabalho
WORKDIR /app

# Etapa 3: Copiar arquivos de dependência
COPY package*.json ./

# Etapa 4: Instalar dependências
RUN npm install

# Etapa 5: Copiar o restante da aplicação
COPY . .

# Etapa 6: Expor a porta usada pela API
EXPOSE 3000

# Etapa 7: Rodar swagger.js e depois iniciar o servidor
CMD ["npm", "start"]
