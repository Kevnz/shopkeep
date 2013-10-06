var kue = require('kue'),
    redis = require('redis');
var qconf = require('qconf'),
    config = qconf();

kue.redis.createClient = function() {
    var client = redis.createClient(config.get('queue-port'), config.get('queue-endpoint'));
    client.auth(config.get('queue-password'));
    return client;
};
exports.index = function(req, res){
  res.render('index', { title: 'Shopkeep', subtitle:'Keeping the show' });
};
exports.customers = function(req, res){
  res.render('create_customer', { title: 'Shopkeep', subtitle:'Keeping the show' });
};

exports.saveCustomer = function (req, res) {
 
};