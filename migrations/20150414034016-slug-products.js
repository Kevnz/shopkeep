'use strict';
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var to = require('to-case');

exports.up = function(db, callback) {
    console.log(db);
    var products = require('mongo-start')('products');
    var bulk = products.initializeOrderedBulkOp();

    products.find(function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
            bulk.find({_id: docs[i]._id}).update({$set:{slug:to.slug(docs[0]) }});
        }
    });
    bulk.execute(function(err, res) {
        callback();
    });
  
};

exports.down = function(db, callback) {
  callback();
};
