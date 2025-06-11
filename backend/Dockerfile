
FROM node:22-slim
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
