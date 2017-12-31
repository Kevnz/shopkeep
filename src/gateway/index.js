console.log('Start api gateway');
const Glue = require('glue');

const manifest = {
  server: {
    port: 4567,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    },
    router: {
      stripTrailingSlash: true
    }
  },
  register: {
    plugins: [{
      plugin: 'h2o2'
    },{
      name: 'route-loader',
      plugin: './plugins/routes'
    },],
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
    console.log('hapi entry h2o2 days!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
