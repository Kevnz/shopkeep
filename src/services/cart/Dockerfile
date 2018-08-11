FROM node:carbon
WORKDIR appdir/
COPY ./src/services/cart/ .

RUN npm install

CMD ["npm", "run", "dev"]
