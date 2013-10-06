exports.index = function(req, res){
  res.render('index', { title: 'Shopkeep', subtitle:'Keeping the show' });
};
exports.customers = function(req, res){
  res.render('create_customer', { title: 'Shopkeep', subtitle:'Keeping the show' });
};

exports.saveCustomer = function (req, res) {
    var Guid = require('guid');
    var db = require('../lib/db')('customer');
    var customers =  require('../lib/db')('customer');
    console.log(customers);
    var customer = {};
    var cards =  require('../lib/db')('cc_details');
    customer.first_name = req.body.first_name;
    customer.last_name = req.body.last_name;
    customer.email = req.body.email;
    customer.created_on = new Date();
    customer.id = Guid.create().toString();

    var donation = {};
    donation.amount = req.body.amount;
    donation.repeat = req.body.repeat ? true : false;

    var cc = {};
    cc.name = req.body.CC_name;
    cc.number = req.body.CC_number;
    cc.expiry = req.body.CC_expiry;
    cc.cvc2 = req.body.CC_cvc2;
    customer.credit_card = cc; //This is dangerous, don't like it

    console.log(donation);
    customers.save(customer, function (err, obj) {
        if(err) {
            res.send(500, {error: 'something is wrong'});
        } else {
            donation.reference = 'Payment from user ' + customer.id;
            var pay = require('./lib/pay');
            pay.pay(donation, cc, function(err, transaction) {
                if(err) {
                    //need solution to handle error
                }
                if(donation.repeat) {
                    //save info to a queue that will schedule future payments
                    var kue = require('kue'),
                        redis = require('redis');

                    kue.redis.createClient = function() {
                        var client = redis.createClient(config.get('queue-port'), config.get('queue-endpoint'));
                        client.auth(config.get('queue-password'));
                        return client;
                    };

                    jobs.create('schedule_payment', {
                        customer_id: customer.id,
                        amount: donation.amount,
                        start_date: new Date()
                    }).save();
                }
               res.send(200);
            });
            
        }

    });
};