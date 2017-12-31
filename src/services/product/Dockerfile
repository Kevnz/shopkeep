FROM node:carbon
WORKDIR appdir/
COPY ./src/services/product/ .

RUN npm install

CMD ["npm", "run", "dev"]
