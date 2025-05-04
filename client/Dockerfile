FROM node:20-alpine AS development
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=development /app/.next/standalone ./
COPY --from=development /app/.next/static ./.next/static
COPY --from=development /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]