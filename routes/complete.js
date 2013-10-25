
var shopify = require('../lib/shopify');

exports.success = function(req, res){
    var user = req.query.user;
    var userid = req.query.userid;
    var donation = req.query.donation;
    var result = req.query.result;
    var successDB = require('../lib/db')('success');
    successDB.save({
        userId: user,
        donationId: donation,
        result: result,
        created_on: new Date()
        }, function () {

         var customers = require('../lib/db')('customer');
         var donations = require('../lib/db')('donations');
         if (user) {
            customers.findAndModify({
                    query: { id: user},
                    update: { paid: true },
                    new: false
                },
                function (err, userDoc) {
                    shopify.createCustomer(userDoc, function (err, shopifyCustomer) {
                        //res.redirect('http://taxpayers.org.nz/donation-success');
                    });
                });
        } else if (donation) {
            donations.findAndModify({
                    query: { id: donation},
                    update: { paid: true },
                    new: false
                },
                function (err, userDoc) {
                    //res.redirect('http://taxpayers.org.nz/donation-success');
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
                    update: { paid: false },
                    new: false
                },
                function (err, userDoc) {

                    //do I want to do this.
                    shopify.createCustomer(userDoc, function (err, shopifyCustomer) {
                        //res.redirect('http://taxpayers.org.nz/donation-fail');
                    });
                });
        } else if (donation) {
            donations.findAndModify({
                    query: { id: donation},
                    update: { paid: false },
                    new: false
                },
                function (err, userDoc) {
                    //res.redirect('http://taxpayers.org.nz/donation-fail');
                });
        }
        //res.redirect('http://taxpayers.org.nz/donation-fail')
    });
 
};
