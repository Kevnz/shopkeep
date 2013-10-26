 
exports.donation = function(req, res){
  res.render('donations', { title: 'Taxpayers Union '});
};
var qconf = require('qconf'),
    config = qconf();
var shopify = require('../lib/shopify');
exports.saveDonation = function (req, res) {
    /*
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    */
    try {
        var Guid = require('guid'); 
        var donations =  require('../lib/db')('donations');
        var customers =  require('../lib/db')('customer');
        var donation = {};
        donation.first_name = req.body.first_name;
        donation.last_name = req.body.last_name;
        donation.email = req.body.email;
        donation.address1 = req.body.address1;
        donation.address2 = req.body.address2;
        donation.address3 = req.body.address3;
        donation.postcode = req.body.postcode;
        donation.paid = false;
        donation.repeat = req.body.repeat;
        donation.join = req.body.join;
        if (donation.join == 'on') {
            donation.password = req.body.password;
            donation.password_confirmation = req.body.password_confirm;
        }

        donation.created_on = new Date();
        var refId = donation.id = Guid.create().toString();
        var intholder = 0;
        try {
           intholder = parseInt((req.body.donation_amount || req.body.custom_amount), 10);
        }catch(err) {}
        if (donation.join == 'on') {
            intholder = intholder + 5;
        }
 
        donation.amount = intholder;
        donation.repeat = false;
        console.log(donation);
        donations.save(donation, function (err, obj) {
            if(err) {
                res.send(500, { error: 'something is wrong' });
            } else {
                //save as a customer now

                donation.reference = 'Payment from user ' + donation.id;
                var pxpay = require('pxpay');

                var transaction = {
                    user: config.get('dps-user'),
                    password: config.get('dps-password'),
                    amount:  donation.amount + '.00',
                    reference: 'Payment from user ' + donation.id,
                    email: donation.email,
                    TxnId: 'trans-'+ Guid.create().toString(),
                    addCard: donation.repeat ? 1 : 0,
                    successURL: 'http://localhost:4567/success?donation='+ refId,
                    failURL: 'http://localhost:4567/fail?donation='+ refId
                };
                if (donation.join == 'on') {
                    console.log('save customer');
                    donation.wasDonation = true;
                    donation.donationId = refId;
                    donation.id = refId;
                    customers.save(donation);
                    transaction.successURL = 'http://localhost:4567/success?user='+ refId;
                    transaction.failURL = 'http://localhost:4567/fail?user='+ refId;
                }
                pxpay.request(transaction, function(err, result) {
                    var url = result.URI;
                    res.redirect(url);
                });
                 
            }
        });
    } catch (failed) {
        res.send(200, failed);
    }
};