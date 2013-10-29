var qconf = require('qconf'),
    config = qconf();

module.exports = function (collection) {

	var mongo = require('mongoskin'); 

    return mongo.db(config.get('db-connection')).collection(collection);
};

