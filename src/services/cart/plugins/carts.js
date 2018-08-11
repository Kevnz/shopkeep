const cartService = require('../services/carts');

const register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/cart',
    handler: (request, h) => {

      return cartService.getForUser();
    }
  });
  server.route({
    method: 'PUT',
    path: '/cart/{productId}',
    handler: async (request, h) => {
      let cookie = request.state.session;

      if (!cookie) {
        // create cart item
        // save product to cart
        // return cart id set in cookie

        const cart = await cartService.createCart();
        cookie = {
          identifier: cart.identifier
        };
      }

      cookie.lastVisit = Date.now()
      return "";
    }
  });

  server.route({
    method: 'GET',
    path: '/{cartId}',
    handler: (request, h) => {
      return ''
    }
  });
};

const name = 'cart';

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
