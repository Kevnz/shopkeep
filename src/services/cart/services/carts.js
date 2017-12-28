const db = require('./db');
const config = require('xtconf')();

module.exports = {
    get: async (id) => {
      const users = db.carts;
      const user = await carts.findOne({id});
      return user;
    },
    getAllForUser: async (userId) => {
      const users = db.carts;
      const allCarts = await carts.find({ userId });
      console.log('users', allCarts);
      return allCarts;
    },
    update: async (id) => {
      const carts = db.carts;
      await carts.findOne({id});
      return true;
    },

}
