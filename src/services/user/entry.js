console.log('Start user service');
const Glue = require('glue');

const manifest = {
  server: {
    port: 3001,
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
      name: 'get-users',
      plugin: './plugins/get-users',
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
      method: (request, h) => {
        return h.continue;
      }
    });
    console.log('hapi user service has started!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
