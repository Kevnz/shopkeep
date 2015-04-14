'use strict';
require('babel/register');

var casual = require('casual');
var products = require('mongo-start')('products');
var addProduct = require('./seeds/products').addProduct;
addProduct(casual);
var bulk = products.initializeOrderedBulkOp();

for (var i = 0; i < 100; i++) {
    var product = casual.product;
    bulk.insert(product)
}
bulk.execute(function(err, res) {
    console.log('Done!');
    process.exit(0);
});
