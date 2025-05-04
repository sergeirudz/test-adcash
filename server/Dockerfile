FROM node:20-alpine AS development
WORKDIR /app

COPY package.json ./

RUN npm install

COPY src/ ./src/
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY package.json ./

RUN npm install --only=production

COPY --from=development /app/dist ./dist

EXPOSE 80

CMD ["node", "dist/main"]