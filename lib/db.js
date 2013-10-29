var qconf = require('qconf'),
    config = qconf();



module.exports = function (collection) {
	var mongojs = require('mongojs');
    var db = mongojs(config.get('db-connection'));
    return db.collection(collection);
};