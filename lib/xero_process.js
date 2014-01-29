var allIn = function (customer, callback) {
        var xero = require('./xero_contact');
        xero.createContact(customer, function (err, results) {
         var xeroInv = require('./xero_invoice');
            xeroInv.raise(customer, function (err, results) {
                callback(null, null);
            });
        });
};
var donationIn = function (customer, callback) {
    var xero = require('./xero_contact');
    xero.createContact(customer, function (err, results) {
     var xeroInv = require('./xero_invoice');
        xeroInv.raiseDonation(customer, function (err, results) {
            callback(null, null);
        });
    });
};
exports.SendToXero = allIn;
exports.SendDonationToXero = donationIn;