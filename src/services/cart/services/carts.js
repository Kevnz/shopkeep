const db = require('./db');
const config = require('xtconf')();
const uuid = require('uuid/v1');
module.exports = {
  createCart: async () => {
    return db.carts.save({ identifier: uuid() });
  },
  get: async (id) => {
    const carts = db.carts;
    const user = await carts.findOne({ identifier: id });
    return user;
  },
  getAllForUser: async (userId) => {
    const carts = db.carts;
    const allCarts = await carts.find({ userId });
    console.log('users', allCarts);
    return allCarts;
  },
  update: async (cartId, data) => {
    const carts = db.carts;
    await carts.findOne({id});
    return true;
  },

}
