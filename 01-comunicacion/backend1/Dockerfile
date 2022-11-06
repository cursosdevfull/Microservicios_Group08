FROM node:14-alpine

ARG BASE_DIR

WORKDIR /application

COPY ${BASE_DIR}/package.json .

RUN npm install

COPY ${BASE_DIR}/. .

CMD ["npm", "run", "start"]