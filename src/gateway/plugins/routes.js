const register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return "yup";
    }
  });
  server.route({
    method: 'GET',
    path: '/api/v1/users/',
    handler: (request, h)=> {
      console.log
      console.log('handle this yo');
      return h.proxy({ uri: 'http://user:3001/v1/users/' });
  }
  });
  server.route({
    method: 'GET',
    path: '/api/v1/users/{routes*}',
    handler: (request, h)=> {
      console.log
      console.log('handle this yo yo yo');
      return h.proxy({ uri: 'http://user:3001/v1/users/' });
    }
  });
};

const name = 'routes';
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
