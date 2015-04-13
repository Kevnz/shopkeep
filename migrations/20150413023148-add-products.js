'use strict';
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createCollection('products', function (err, collection) {
        db.addIndex('products', 'products_name', 'name', false, callback);
    });
};

exports.down = function(db, callback) {
    db.removeIndex('products', 'products_name', function () {
        db.dropCollection('products', callback);
    });
    
};
