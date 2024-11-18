# Usar una imagen base oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios para la instalación de dependencias
COPY package*.json ./

# Instalar las dependencias de producción
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que la aplicación utiliza
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
