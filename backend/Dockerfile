FROM node:18
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 5001

CMD ["npm", "run", "dev"]
