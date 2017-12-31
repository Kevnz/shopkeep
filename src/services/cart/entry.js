console.log('Start cart service');
const Glue = require('glue');
const config = require('xtconf')();
const manifest = {
  server: {
    port: config.get('port'),
    routes: {
      cors: true
    },
    router: {
      stripTrailingSlash: true
    }
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

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    server.ext({
      type: 'onRequest',
      method: function (request, h) {
        console.log('path maybe???', request.url);
        return h.continue;
      }
    });
    console.log('shopkeep cart service has started!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
