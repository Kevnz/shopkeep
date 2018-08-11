const userService = require('../services/users');

const register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/users',
    handler: (request, h) => {
      console.log('ping get all');
      return userService.getAll();
    }
  });
  server.route({
    method: 'GET',
    path: '/all',
    handler: (request, h) => {
      console.log('ping get all');
      return userService.getAll();
    }
  });
  server.route({
    method: 'GET',
    path: '/gen-all',
    handler: (request, h) => {
      return userService.genAll();
    }
  });
  server.route({
    method: 'GET',
    path: '/users/{userId}',
    handler: (request, h) => {
      console.log('ping get one');
      return userService.get(request.params.userId);
    }
  });
};

const name = 'users-get';

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
