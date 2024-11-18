# Etapa 1: Construcción
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir archivos estáticos con Nginx
FROM nginx:alpine

# Copiar los archivos generados en la etapa de construcción al servidor Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80 (Nginx predeterminado)
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["nginx", "-g", "daemon off;"]
