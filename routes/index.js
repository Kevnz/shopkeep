exports.index = function(req, res){
  res.render('index', { title: 'Shopkeep', subtitle:'Keeping the shop' });
};
exports.customers = function(req, res){
  res.render('create_customer', { title: 'Shopkeep', subtitle:'Keeping the shop' });
};
var qconf = require('qconf'),
    config = qconf();
var logger = require('../lib/logger');
var dps = '-' + config.get('dps');
exports.saveCustomer = function (req, res) {

    try {
        var Guid = require('guid');
        var customers =  require('../lib/db')('customer');
        var transactions =  require('../lib/db')('transaction');
        var customer = {};
        customer.first_name = req.body.first_name;
        customer.last_name = req.body.last_name;
        customer.email = req.body.email;
        customer.phone_number = req.body.phone;
        customer.created_on = new Date();
        customer.id = Guid.create().toString();
        customer.address1 = req.body.address1 ;
        customer.address2 = req.body.address2 || '' ;
        customer.address3 = req.body.address3;
        customer.postcode = req.body.postcode;
        customer.password = req.body.password;
        customer.password_confirmation = req.body.password_confirmation;
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
        if(isNaN(intholder)) {
            intholder = 5;
        }
        logger.log(intholder);
        donation.amount =  intholder;
        donation.repeat = req.body.repeat ? true : false;
        customer.amount = intholder;
        customer.donationAmount = intholder - 5;
        customer.didDonate = ((intholder - 5) > 0);
        customer.repeat = donation.repeat;
        logger.logObject(customer, 'customer that will be saved');
        customers.save(customer, function (err, obj) {
            logger.logObject(obj, 'customer that was saved');
            if(err) {
                logger.logObject(err, "error with save");
                res.send(500, {error: 'something is wrong', result: err});
            } else {
                
                
                donation.reference = 'Payment from user ' + customer.id;
                var pxpay = require('pxpay');

                var transaction = {
                    user: config.get('dps-user' + dps),
                    password: config.get('dps-password' + dps),
                    amount:  donation.amount + '.00',
                    reference: 'Payment from user ' + customer.id,
                    line1: 'Payment for joing Taxpayers Union',
                    email: customer.email,
                    TxnId: 'trans-'+ Guid.create().toString(),
                    addCard: donation.repeat ? 1 : 0,
                    successURL: 'https://tradeshop.azurewebsites.net/success?user='+ customer.id,
                    failURL: 'https://tradeshop.azurewebsites.net/fail?user='+ customer.id
                };
                transactions.save(transaction);
                logger.logObject(transaction, "transaction from saving customer");
                try {
                    logger.log('try/catch pxpay');
                    pxpay.request(transaction, function pxrequestCallback (errpx, pxresult) {
                        logger.logObject(arguments, 'pxargs');
                        logger.logObject(errpx, "px error object");
                        logger.logObject(pxresult, "px result object");
                        var url = pxresult.URI;
                        var shopify = require('../lib/shopify');
                        shopify.createCustomer(customer, function (){});
                        res.redirect(url);
                    });
                } catch (pxerror) {
                    logger.logObject(pxerror, "error with pxpay");
                    res.redirect('http://taxpayers.org.nz/?fail=true');
                }
            }
        });
    } catch(failed) {
        res.send(200, failed);
    }
};