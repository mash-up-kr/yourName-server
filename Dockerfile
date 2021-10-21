FROM node:14 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clear --force

COPY . .

RUN npm run build

FROM node:14-alpine
WORKDIR /app

COPY --from=builder /app ./
EXPOSE 3000

CMD ["npm", "run", "start"]
