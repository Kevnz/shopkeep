FROM node:carbon
WORKDIR appdir/
COPY ./src/services/user/ .

RUN npm install

CMD ["npm", "run", "dev"]
