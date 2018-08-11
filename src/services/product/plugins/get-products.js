const productService = require('../services/products');

const register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/products',
    handler: (request, h) => {
      console.log('the things')
      return productService.getAll();
    }
  });
  server.route({
    method: 'GET',
    path: '/products/{productId}',
    handler: (request, h) => {
      return productService.get(request.params.productId);
    }
  });
};

const name = 'products-get';

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
