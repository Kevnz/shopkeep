
var shopify = require('../lib/shopify');
var log = require('../lib/db')('logtastic');
exports.success = function(req, res){
    console.log(req.body);
    var user = req.query.user;
    var userid = req.query.userid;
    var donation = req.query.donation;
    var result = req.query.result;
    var successDB = require('../lib/db')('success');
    console.log('success');
    successDB.save({
        userId: user,
        dpsUserId: userid,
        donationId: donation,
        result: result,
        created_on: new Date()
        }, function () {

         var customers = require('../lib/db')('customer');
         var donations = require('../lib/db')('donations');
         if (user) {
            customers.findAndModify({
                    query: { id: user},
                    update:{ $set: { paid: true }},
                    new: false
                },
                function (err, userDoc) {
                    log.logObject(err);
                    log.logObject(userDoc);
                    res.send(200, userDoc);
                    shopify.createCustomer(userDoc, function (err, shopifyCustomer) {
                        log.logObject(err);
                        log.logObject(shopifyCustomer);
                        res.redirect('http://taxpayers.org.nz/donation-success');
                    });
                });
        } else if (donation) {
            donations.findAndModify({
                    query: { id: donation},
                    update:{ $set: { paid: true }},
                    new: false
                },
                function (err, userDoc) {
                    res.redirect('http://taxpayers.org.nz/donation-success');
                });
        }
    });
};


exports.fail = function(req, res){
    var user = req.query.user;
    var donation = req.query.donation;
    var result = req.query.result;

    var failedDB = require('../lib/db')('failed');
    failedDB.save({
        userId: user,
        result: result,
        requestBody: req.body,
        created_on: new Date()
    }, function () {

        var customers = require('../lib/db')('customer');
        var donations = require('../lib/db')('donations');
        if (user) {
            customers.findAndModify({
                    query: { id: user},
                    update:{ $set: { paid: false }},
                    new: false
                },
                function (err, userDoc) {

                    //do I want to do this.
                    //shopify.createCustomer(userDoc, function (err, shopifyCustomer) {
                        //res.redirect('http://taxpayers.org.nz/donation-fail');
                    //});
                });
        } else if (donation) {
            donations.findAndModify({
                    query: { id: donation},
                    update:{ $set: { paid: false }},
                    new: false
                },
                function (err, userDoc) {
                    res.redirect('http://taxpayers.org.nz/donation-fail');
                });
        }
        res.redirect('http://taxpayers.org.nz/donation-fail');
    });
 
};
