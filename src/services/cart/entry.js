const getServer = require('./server');

const startServer = async () => {
  try {
    const server = await getServer();
    await server.start();
    server.ext({
      type: 'onRequest',
      method: (request, h) => {
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
