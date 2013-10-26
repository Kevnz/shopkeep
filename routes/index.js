exports.index = function(req, res){
  res.render('index', { title: 'Shopkeep', subtitle:'Keeping the show' });
};
exports.customers = function(req, res){
  res.render('create_customer', { title: 'Shopkeep', subtitle:'Keeping the show' });
};
var qconf = require('qconf'),
    config = qconf();
var logger = require('../lib/logger');
var dps = '-' + config.get('dps');
exports.saveCustomer = function (req, res) {

    try {
        var Guid = require('guid');
        var db = require('../lib/db')('customer');
        var customers =  require('../lib/db')('customer');
        var customer = {};
        customer.first_name = req.body.first_name;
        customer.last_name = req.body.last_name;
        customer.email = req.body.email;
        customer.phone_number = req.body.phone_number;
        customer.created_on = new Date();
        customer.id = Guid.create().toString();
        customer.address1 = req.body.address1;
        customer.address2 = req.body.address2 || '';
        customer.address3 = req.body.address3;
        customer.postcode = req.body.postcode;
        customer.password = req.body.password;
        customer.password_confirmation = req.body.password_confirm;
        customer.paid= false;
        var donation = {};
        var intholder = 0;
        
        try {
            intholder = parseInt((req.body.donation_amount || req.body.custom_amount), 10);
            intholder = intholder + 5;
        } catch(err) { 
            logger.logObject(err);
            logger.log('failed parsing');
            intholder = 5;
        }
        logger.log(intholder);
        donation.amount =  intholder;
        donation.repeat = req.body.repeat ? true : false;
        logger.log('presave');
        customers.save(customer, function (err, obj) {
            if(err) {
                res.send(500, {error: 'something is wrong', result: err});
            } else {
                
                
                donation.reference = 'Payment from user ' + customer.id;
                var pxpay = require('pxpay');

                var transaction = {
                    user: config.get('dps-user' + dps),
                    password: config.get('dps-password' + dps),
                    amount:  donation.amount + '.00',
                    reference: 'Payment from user ' + customer.id,
                    email: customer.email,
                    TxnId: 'trans-'+ Guid.create().toString(),
                    addCard: donation.repeat ? 1 : 0,
                    successURL: 'https://tradeshop.azurewebsites.net/success?user='+ customer.id,
                    failURL: 'https://tradeshop.azurewebsites.net/fail?user='+ customer.id
                };
                logger.logObject(transaction); 
                pxpay.request(transaction, function(errpx, result) {
                    logger.logObject(errpx);
                    var url = result.URI;
                    res.redirect(url);
                });
                
            }

        });
    } catch(failed) {
        res.send(200, failed);
    }
};