const db = require('./db');
const faker = require('faker');
const products = db.products;
module.exports = {
  get: async (id) => {
    const product = await products.findOne({id});
    return product;
  },
  getAll: async () => {
    const allproducts = await products.find({});
    return allproducts;
  }
}
