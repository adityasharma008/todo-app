FROM node:18-alpine AS build

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json .
RUN npm ci --production

USER node
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]