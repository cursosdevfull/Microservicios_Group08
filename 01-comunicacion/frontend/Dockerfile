FROM node:14-alpine

WORKDIR /application

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]