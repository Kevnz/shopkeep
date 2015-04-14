'use strict';
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var to = require('to-case');

exports.up = function(db, callback) {
    db.addIndex('products', 'product_slug', 'slug', false, callback);
};

exports.down = function(db, callback) {
  callback();
};
