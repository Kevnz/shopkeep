const register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'nothing to see';
    }
  });
  server.route({
    method: 'GET',
    path: '/api/v1/users/{routes*}',
    handler: (request, h)=> {
      return 'Hi There, now go away';
    }
  });
  server.route({
    method: 'GET',
    path: '/api/v1/products/{routes*}',
    handler: (request, h)=> {
      const uri = `http://shopkeep.services.product:3002/v1/products/${request.params.routes || ''}`;
      return h.proxy({ uri });
    }
  });
  server.route({
    method: 'GET',
    path: '/{routes*}',
    handler: (request, h) => {
      const uri = `http://shopkeep.apps.storefront:4001/${request.params.routes || ''}`;
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
