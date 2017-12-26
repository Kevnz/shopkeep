FROM node:carbon
WORKDIR appdir/
COPY ./src/services/user/package.json .

RUN npm install

CMD ["npm", "run", "dev"]
