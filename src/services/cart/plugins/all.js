const userService = require('../services/users');

const register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/*',
    handler: (request, h) => {
      console.log('All the things');
      return;
    }
  });
};

const name = 'all';

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
