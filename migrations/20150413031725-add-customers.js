'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createCollection('customers', function (err, collection) {
        db.addIndex('customers', 'customer_lastName', 'lastName', false, function () {
            db.addIndex('customers', 'customer_email', 'email', false, callback);
        });
        
        callback();
    });
  
};

exports.down = function(db, callback) {
    db.removeIndex('customers', 'customer_lastName', function () {
        db.removeIndex('customers', 'customer_email', function () {
            db.dropCollection('customers', callback);
        });
    });
};
