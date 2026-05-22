# Step 1: Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM alpine:latest

WORKDIR /var/www/html

COPY --from=builder /app/dist .

CMD ["echo", "Static files are ready in /var/www/html"]