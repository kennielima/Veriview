FROM node:22-slim AS builder

WORKDIR /app
# COPY .env .env

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:22-slim AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["npm", "start"]
