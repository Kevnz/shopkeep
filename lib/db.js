var qconf = require('qconf'),
    config = qconf();


var mongojs = require('mongojs');


module.exports = function (collection) {
    var db = mongojs(config.get('db-connection'));

    return db.collection(collection);
};