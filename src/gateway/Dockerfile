FROM node:carbon
WORKDIR appdir/
COPY ./src/gateway/package.json .

RUN npm install

CMD ["npm", "run", "dev"]
