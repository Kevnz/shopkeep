 
exports.donation = function(req, res){
  res.render('create_customer', { title: 'Taxpayers Union '});
};
var qconf = require('qconf'),
    config = qconf();
exports.saveDonation = function (req, res) {
    try {
        var Guid = require('guid');
        var db = require('../lib/db')('donations');
        var donations =  require('../lib/db')('donations');
        console.log(donations);
        var donation = {};
        donation.first_name = req.body.first_name;
        donation.last_name = req.body.last_name;
        donation.email = req.body.email;
        donation.address1 = req.body.address1;
        donation.address2 = req.body.address2;
        donation.address3 = req.body.address3;

        donation.repeat = req.body.repeat;
        donation.public = req.body.public;
        donation.provideFriends = req.body.provide_friends;
        donation.privateIdentified = req.body.private_identified;
        donation.contactMethod =  req.body.contactMethod;


        donation.created_on = new Date();
        donation.id = Guid.create().toString();

        var donation = {};
        donation.amount = req.body.amount;
        donation.repeat = false;

        donations.save(donation, function (err, obj) {
            if(err) {
                res.send(500, {error: 'something is wrong'});
            } else {
                donation.reference = 'Payment from user ' + donation.id;
                var pxpay = require('pxpay');

                var transaction = {
                    user: config.get('dps-user'),
                    password: config.get('dps-password'),
                    amount:  donation.amount + '.00',
                    reference: 'Payment from user ' + donation.id,
                    email: donation.email,
                    TxnId: 'trans-'+ Guid.create().toString(),
                    billingId: 'bd-' + Date.now(),
                    addCard: donation.repeat ? 1 : 0,
                    successURL: 'https://tradeshop.azurewebsites.net/success?user='+ donation.id,
                    failURL: 'https://tradeshop.azurewebsites.net/fail?user='+ donation.id
                };
                console.log(transaction);
                pxpay.request(transaction, function(err, result) {
                    var url = result.URI;
                    res.redirect(url);
                });
                
            }

        });
    } catch(failed) {
        res.send(200, failed);
    }
};