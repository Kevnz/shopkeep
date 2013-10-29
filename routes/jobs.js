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
exports.process_payment_queue = function (req, res) {
    //jobs.process('payment', 20, function(job, done){
        
    //});
};

exports.process_schedule_queue = function (req, res) {
    //jobs.process('schedule', 20, function(job, done){
        
    //});
};