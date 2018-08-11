FROM node:carbon
WORKDIR appdir/
COPY ./src/apps/storefront/ .

RUN npm install

CMD ["npm", "run", "dev"]
