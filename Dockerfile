FROM node:12-alpine

WORKDIR /app

COPY package.json yarn.lock index.js ./

RUN yarn install

CMD ["node", "index.js"]    