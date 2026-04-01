FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 5001

CMD ["npm", "start"]
