FROM node:17

WORKDIR /ping
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]