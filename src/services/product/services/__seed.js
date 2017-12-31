const faker = require('faker');
const db = require('./db');
const config = require('xtconf')();
const schema = require('./product-schema');

const { promisify } = require('util');
const uuid = require('uuid/v1');
const generator = require('../utils/generators');

const CATEGORIES = ['clothing', 'books', 'food', 'automotive']


const genProduct = generator.generateProduct;

setTimeout(async () => {
  const productGens = [];
  try {
    if (!db.products) {
      console.log('create collection')
      await db.createCollection('products');
    }
    const { products } = db;
    let count = 100;
    while (count > 0) {
      const prod = genProduct(schema)
      productGens.push(prod);
      count--;
    }

    const fakes = productGens;
    await products.insert(fakes);
    console.log('Product Seed Complete')
    process.exit(0);
  } catch (err) {
    console.error('Product Seed Error', err);
    process.exit(0);
  }
}, 5000);
