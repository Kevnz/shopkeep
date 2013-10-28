
var shopify = require('../lib/shopify');
var log = require('../lib/logger');
exports.success = function(req, res){
    log.logObject(req.body, "request body");
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
                    query: { id: user , paid:false },
                    update:{ $set: { paid: true }},
                    new: false
                },
                function (err, userDoc) {
                    log.logObject(err == null, "does findAndModify user error equal null");
                    log.logObject(userDoc == null, "does userDoc equal null");
                    log.logObject(err, "findAndModify user error");
                    log.logObject(userDoc, "userDoc");
                    log.logObject(arguments, 'customer findAndModify return arguments');
                    if (userDoc == null) {
                        //the user doc was null, is that user in database?
                        customers.findOne({ id: user  
                            }, function(err, doc) {
                                if(doc!=null) {
                                    shopify.createCustomer(userDoc, function (err, createdShopifyCustomer) {
                                        res.redirect('http://taxpayers.org.nz/account');
                                    });
                                } else {
                                    res.redirect('http://taxpayers.org.nz/account');
                                }
                        });
                    } else {
                        try {
                            log.log("try to create shopify user");

                            shopify.createCustomer(userDoc, function (err, createdShopifyCustomer) {
                                res.redirect('http://taxpayers.org.nz/account');
                            })
                            
                        } catch (shopError) {
                            log.log('shopify catch error');
                            log.logObject(shopError);
                            res.redirect('http://taxpayers.org.nz/donation-fail');
                        }
                    }
  
                });
        } else if (donation) {
            donations.findAndModify({
                    query: { id: donation},
                    update:{ $set: { paid: true }},
                    new: false
                },
                function (err, userDoc) {
                    res.redirect('http://taxpayers.org.nz/pages/donation-success');
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
                    res.redirect('http://taxpayers.org.nz/donation-fail');
                });
        } else if (donation) {
            donations.findAndModify({
                    query: { id: donation},
                    update:{ $set: { paid: false }},
                    new: false
                },
                function (err, userDoc) {
                    res.redirect('http://taxpayers.org.nz/pages/donation-fail');
                });
        }
        res.redirect('http://taxpayers.org.nz/pages/donation-fail');
    });
 
};
