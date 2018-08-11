
const Glue = require('glue');
const manifest = require('./manifest');

const options = {
  relativeTo: __dirname
};
module.exports = async () => {
  const server = await Glue.compose(manifest, options);
  server.state('session', {
    ttl: 1000 * 60 * 60 * 24, // 1 day lifetime
    encoding: 'base64json'
  });
  return server;
};
