
FROM node:22-slim

WORKDIR /backend
COPY .env .env

COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
