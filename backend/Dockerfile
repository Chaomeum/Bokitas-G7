FROM node:16

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 5000

# Comando para ejecutar el servidor
CMD ["npm", "run", "dev"]
