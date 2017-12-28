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
    path: '/api/v1/users',
    handler: (request, h)=> {
      console.log
      console.log('handle this yo');
      return h.proxy({ uri: 'http://shopkeep.services.user:3001/v1/users' });
  }
  });
  server.route({
    method: 'GET',
    path: '/api/v1/users/{routes*}',
    handler: (request, h)=> {
      console.log('shopkeep.services.user');
      console.log('handle this shopkeep.services.user');
      return h.proxy({ uri: `http://shopkeep.services.user:3001/v1/users/${request.params.routes || ''}` });
    }
  });
  server.route({
    method: 'GET',
    path: '/api/v1/products/{routes*}',
    handler: (request, h)=> {
      const uri = `http://shopkeep.services.product:3002/v1/products/${request.params.routes || ''}`;
      console.log(uri);
      console.log('handle the shopkeep.services.product:3002 api');
      return h.proxy({ uri });
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
