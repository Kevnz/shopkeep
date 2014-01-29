
var shopify = require('../lib/shopify');
var log = require('../lib/logger');
exports.success = function(req, res) {

    log.logObject(req.body, "request body");
    var user = req.query.user;
    var userid = req.query.userid;
    var donation = req.query.donation;
    var result = req.query.result;
    var successDB = require('../lib/db')('success');
    successDB.save({
        userId: user,
        dpsUserId: userid,
        donationId: donation,
        result: result,
        created_on: new Date()
        }, function () {

         var customers = require('../lib/db')('customer');
         var donations = require('../lib/db')('donations');
         var xero = require('../lib/xero_process');
         if (user) {
            customers.findAndModify({
                    query: { id: user, paid: false },
                    update:{ $set: { paid: true }},
                    new: false
                },
                function (err, userDoc) {
                    if (userDoc === null) {
                        customers.findOne({ id: user }, function(err, doc) {
                            if (doc !== null) {
                                shopify.createCustomer(doc, function (err, createdShopifyCustomer) {
                                    
                                    
                                    xero.SendToXero(doc, function (err, results) {
                                        if (doc.didDonate) {
                                            res.redirect('http://taxpayers.org.nz/pages/memberplusdonate');
                                        } else {
                                            res.redirect('http://taxpayers.org.nz/pages/thanks');
                                        }
                                    });
                                });
                            } else {
                                res.redirect('http://taxpayers.org.nz/pages/thanks');
                            }
                        });
                    } else {
                        try {
                            
                            shopify.createCustomer(userDoc, function (err, createdShopifyCustomer) {
                                xero.SendToXero(userDoc, function (xerr, results) {
                                    if (err) {
                                        if (userDoc.didDonate) {
                                            res.redirect('http://taxpayers.org.nz/pages/memberplusdonate');
                                        } else {
                                            res.redirect('http://taxpayers.org.nz/pages/thanks');
                                        }
                                    } else {
                                       if (userDoc.didDonate) {
                                            res.redirect('http://taxpayers.org.nz/pages/memberplusdonate');
                                        } else {
                                            res.redirect('http://taxpayers.org.nz/pages/thanks');
                                        }
                                    }
                                });
                            });
                        } catch (shopError) {
                            log.logObject(shopError);
                            res.redirect('http://taxpayers.org.nz/donation-fail');
                        }
                    }
  
                });
        } else if (donation) {
            donations.findAndModify({
                    query: { id: donation, paid: false},
                    update:{ $set: { paid: true }},
                    new: false
                },
                function (err, userDoc) {
                    if (userDoc === null) return;
                    xero.SendToXero(userDoc, function (xerr, results) {
                        res.redirect('http://taxpayers.org.nz/pages/donation-success');
                    });
                });
        }
        else {
            log.log('this else should not happen');
            res.redirect('http://taxpayers.org.nz/pages/thanks');
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