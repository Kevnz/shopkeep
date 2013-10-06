var payup = require('../lib/pay');
console.log(payup);
var cc = {
            "type": "visa",
            "number": "4417119669820331",
            "expire_month": "11",
            "expire_year": "2018",
            "cvv2": "874",
            "first_name": "Joe",
            "last_name": "Shopper",
            "billing_address": {
                "line1": "52 N Main ST",
                "city": "Johnstown",
                "state": "OH",
                "postal_code": "43210",
                "country_code": "US"
            }
        };

var goodVisa = {
    name: 'Joe Blow',
    number: '4111111111111111',
    expiry: '1015',
    cvc2: '123'
};
var badVisa = {
    name: 'Joe Blow',
    number: '4999999999999236',
    expiry: '1015',
    cvc2: '123'
};
var details = {
    amount: '20.00',
    reference: 'testing'
};
payup.pay(details, goodVisa, function () {
    payup.pay(details, badVisa, function () {
        console.log('done for now');
    });
    
});

