'use strict';
require('babel/register');

var casual = require('casual');
var db = require('mongo-start');
var addProduct = require('./seeds/products').addProduct;
addProduct(casual);

var products = db('products');
for (var i = 0; i < 100; i++) {
    var product = casual.product;
    console.log('save the product', product);
    products.save(product);
}
process.exit(0);