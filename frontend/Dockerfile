FROM node:22-slim AS builder

WORKDIR /frontend
COPY .env.local .env.local

COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
# COPY . .

FROM node:22-slim AS runner

WORKDIR /frontend
COPY .env.local .env.local

ENV NODE_ENV=development
COPY --from=builder ./frontend .
EXPOSE 3000
CMD ["npm", "run", "dev"]
