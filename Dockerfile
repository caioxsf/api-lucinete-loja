# Etapa 1: Imagem base
FROM node:18

# Etapa 2: Diretório de trabalho
WORKDIR /app

# Etapa 3: Copiar package.json e package-lock.json (se tiver)
COPY package*.json ./

# Etapa 4: Instalar dependências
RUN npm install

# Etapa 5: Copiar o restante da aplicação
COPY . .

# Etapa 6: Expor a porta usada pela aplicação (ajuste se for diferente)
EXPOSE 3000

# Etapa 7: Comando para iniciar a aplicação
CMD ["npm", "start"]
