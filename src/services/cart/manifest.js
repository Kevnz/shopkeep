const config = require('xtconf')();

const manifest = {
  server: {
    port: config.get('port'),
    routes: {
      cors: true
    },
    router: {
      stripTrailingSlash: true
    },

  },
  register: {
    plugins: [{
      name: 'epimetheus',
      plugin: './plugins/epimetheus'
    }, {
      name: 'carts',
      plugin: './plugins/carts',
      routes: {
        prefix: '/v1'
      }
    }],
    options: {

    }
  }
};

const options = {
  relativeTo: __dirname
};
