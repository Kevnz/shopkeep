function TryParseInt(str,defaultValue){    
    var retValue = defaultValue;     
    if(str!=null){         
        if(str.length>0){             
            if (!isNaN(str)){                 
                retValue = parseInt(str);             
            }         
        }     
    }     
    return retValue;
}

exports.donation = function(req, res){
  res.render('donations', { title: 'Taxpayers Union '});
};
var qconf = require('qconf'),
    config = qconf();
var log = require('../lib/logger');
var dps = '-' + config.get('dps');
var failedUrl = 'http://taxpayers.org.nz/pages/donate?error';
exports.saveDonation = function (req, res) {
 
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
        if (donation.join === 'on') {
            donation.password = req.body.password;
            donation.password_confirmation = req.body.password_confirm;
        }

        donation.created_on = new Date();
        var refId = donation.id = Guid.create().toString();
        var intholder = 0;
        var donAmount = TryParseInt(req.body.donation_amount, 0);
        var cusAmount = TryParseInt(req.body.custom_amount, 0);

        if (cusAmount > donAmount) {
            intholder = cusAmount;
        } else {
            intholder = donAmount;
        }
        if (intholder === 0) {
            res.redirect(failedUrl);
        }

        if (donation.join === 'on') {
            intholder = intholder + 5;
        }
 
        donation.amount = intholder;
        donation.repeat = false;
        donation.reference = 'Payment from user ' + donation.id;
        log.logObject(donation);
        donations.save(donation, function (err, obj) {
            if (err === true) {
                log.logObject({error: err, donation:donation}, 'Donations saved error');
                res.redirect(failedUrl);
            } else {
                //save as a customer now

                
                var pxpay = require('pxpay');

                var transaction = {
                    user: config.get('dps-user' + dps),
                    password: config.get('dps-password' + dps),
                    amount:  donation.amount + '.00',
                    reference: 'Payment from user ' + donation.id,
                    email: donation.email,
                    line1: 'Donation to the Taxpayers Union',
                    TxnId: 'trans-'+ Guid.create().toString(),
                    addCard: donation.repeat ? 1 : 0,
                    successURL: 'http://tradeshop.azurewebsites.net/success?donation='+ refId,
                    failURL: 'http://tradeshop.azurewebsites.net/fail?donation='+ refId
                };

                if (donation.join === 'on') {
                    donation.donationAmount = intholder - 5;
                    console.log('save customer');
                    donation.didDonate = true;
                    donation.donationId = refId;
                    donation.id = refId;
                    transaction.successURL = 'http://tradeshop.azurewebsites.net/success?user='+ refId;
                    transaction.failURL = 'http://tradeshop.azurewebsites.net/fail?user='+ refId;
                }
                pxpay.request(transaction, function(err, result) {
                    var url = result.URI;
                    if(donation.join === 'on'){
                        donation.password = req.body.password;
                        donation.password_confirmation = req.body.password_confirmation;
                        customers.save(donation, function (customerSaveError, cus) {
                            res.redirect(url);
                        });
                    } else {
                        res.redirect(url);
                    }
                });
                 
            }
        });
    } catch (failed) {
        log.logObject(failed, 'Tried to do donation and failed');
        res.redirect(failedUrl);
    }
};