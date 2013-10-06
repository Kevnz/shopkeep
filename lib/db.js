var qconf = require('qconf'),
    config = qconf();


var mongojs = require('mongojs');


exports.exports = function (collection) {
    var db = mongojs(config.get('db-connection'), [collection]);
    return db;
};