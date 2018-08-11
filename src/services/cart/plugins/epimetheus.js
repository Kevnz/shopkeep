const metrics = require('epimetheus/lib/metrics')

const register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/metrics',
    handler: (req, h) => {
      return metrics.summary()
    }
  });
  server.ext({
    type: 'onRequest',
    method: function (request, h) {
      request.epimetheus = {
        start: process.hrtime()
      }
      return h.continue;
    }
  });

  server.events.on('response', (response) => {
    metrics.observe(response.method, response.path, response.response.statusCode, response.epimetheus.start)
  });
}

const name = 'epimetheus';
const version = '1.0.0';
const multiple = false;
const once = true;

exports.plugin = {
  register,
  name,
  version,
  multiple,
  once
};

