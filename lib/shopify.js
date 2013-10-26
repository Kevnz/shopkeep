var Shopnode = require('shopnode');

// Basic Authentication
var shopnode = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'b312c2a799104ac529ef8e452f9a4d42',
    password:'0180857a22d7148608e1c575c44d5eb3',
    useBasicAuth:true
});

// OAuth 2.0
/*
var shopnode = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'b312c2a799104ac529ef8e452f9a4d42ey',
    sharedKey:'9b10df8d7170c7c4660077757c1795b2'
});

*/
var logger = require('./logger');
exports.getShopEmail = function (err, cb) {
    shopnode.shop.get(function(err, req, res, shop){
        cb(err, shop.email);
    });
};
exports.createCustomer = function(customer, callback) {
    console.log(customer);
    var shopifyCustomer = {
        "customer": {
            "password": customer.password,
            "password_confirmation": customer.password,
            "first_name": customer.first_name,
            "last_name": customer.last_name,
            "email": customer.email,
            "addresses": [
                {
                    "address1": customer.address1,
                    "address2": customer.address2,
                    "city": customer.address3,
                    "country": "NZ",
                    "phone": customer.phone,
                    "zip": customer.postcode
                }
            ],
            "metafields": [
                {
                "key": "member",
                "value": customer.join || 'no',
                "value_type": "string",
                "namespace": "global"
              }
            ]
        }
    };
    shopnode.customers.post(shopifyCustomer,function(err, req, res, obj){
        logger.logObject(err);
        if (err) {
            logger.log('error posting shopifyCustomer');
            process.nextTick(function (){
                callback(err);
            });
        } else {
            process.nextTick(function (){
                logger.log('posting shopifyCustomer');
                logger.logObject(obj, "shopobject");
                callback(null, obj);
            });
        }
    });
};