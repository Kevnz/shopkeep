console.log('Start product service');
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
      name: 'get-products',
      plugin: './plugins/get-products',
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
    console.log('hapi entry product days!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
