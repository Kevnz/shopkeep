exports.index = function(req, res){
  res.render('index', { title: 'Shopkeep', subtitle:'Keeping the show' });
};
exports.customers = function(req, res){
  res.render('create_customer', { title: 'Shopkeep', subtitle:'Keeping the show' });
};
var qconf = require('qconf'),
    config = qconf();

var shopify = require('../lib/shopify');
exports.saveCustomer = function (req, res) {
    try {
        var Guid = require('guid');
        var db = require('../lib/db')('customer');
        var customers =  require('../lib/db')('customer');
        console.log(customers);
        var customer = {};
        customer.first_name = req.body.first_name;
        customer.last_name = req.body.last_name;
        customer.email = req.body.email;
        customer.created_on = new Date();
        customer.id = Guid.create().toString();
        customer.address1 = req.body.address1;
        customer.address2 = req.body.address2;
        customer.address3 = req.body.address3;
        customer.postcode = req.body.postcode;
        var donation = {};
        var intholder;
        try {
            intholder = parseInt((req.body.donation_amount || req.body.custom_amount), 10);
            if (req.body.custom_amount) {
                intholder = intholder + 5;
            }
        }catch(err) {}
        donation.amount =  intholder;
        donation.repeat = req.body.repeat ? true : false;

        customers.save(customer, function (err, obj) {
            if(err) {
                res.send(500, {error: 'something is wrong'});
            } else {
                
                
                donation.reference = 'Payment from user ' + customer.id;
                var pxpay = require('pxpay');

                var transaction = {
                    user: config.get('dps-user'),
                    password: config.get('dps-password'),
                    amount:  donation.amount + '.00',
                    reference: 'Payment from user ' + customer.id,
                    email: customer.email,
                    TxnId: 'trans-'+ Guid.create().toString(),
                    addCard: donation.repeat ? 1 : 0,
                    successURL: 'https://tradeshop.azurewebsites.net/success?user='+ donation.id,
                    failURL: 'https://tradeshop.azurewebsites.net/fail?user='+ donation.id
                };
                console.log(transaction);
                shopify.createCustomer(customer, function (err, shopifyCustomer) {
                    pxpay.request(transaction, function(err, result) {
                        var url = result.URI;
                        res.redirect(url);
                    });
                });
                
            }

        });
    } catch(failed) {
        res.send(200, failed);
    }
};