FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./


COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
