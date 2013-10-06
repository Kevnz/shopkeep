var paypal_api = require('paypal-rest-sdk');
var request = require('request');
var xml = require('xml');
var qconf = require('qconf'),
    config = qconf();
var dpsUser = config.get('dps-user');
var dpsPass = config.get('dps-password');

module.exports = {
    pay: function (details, card, callback) {
        var dpsData = {
            Txn: [
                { PostUsername: dpsUser },
                { PostPassword: dpsPass },
                { CardHolderName: card.name },
                { CardNumber: card.number },
                { Amount: details.amount },
                { DateExpiry: card.expiry },
                { Cvc2: card.cvc2 },
                { InputCurrency: 'NZD' },
                { TxnType: 'Purchase' },
                { TxnId: "" },
                { MerchentReference: details.reference }
            ]
        };
        console.log(xml(dpsData));
        var url = 'https://sec.paymentexpress.com/pxpost.aspx';
        request({
            uri: url,
            method: 'POST',
            body: xml(dpsData)
        }, function (err, res, body) {
            var parseString = require('xml2js').parseString;
            console.log(err);
            if(err) {
                callback(err);
            }
            parseString(body, function (error, result){
                console.log(result);
                callback(null, result);
            });

        });
    }
};