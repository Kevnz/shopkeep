 
// OAuth 2.0
/*
var shopnode = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'b312c2a799104ac529ef8e452f9a4d42ey',
    sharedKey:'9b10df8d7170c7c4660077757c1795b2'
});

*/
var Shopifapi = require('shopifapi');
var shopify = new Shopifapi({
    auth: {
        username: 'b312c2a799104ac529ef8e452f9a4d42ey',
        password: '9b10df8d7170c7c4660077757c1795b2'
    },
    url: 'https://taxpayersunion.myshopify.com'
});
var logger = require('./logger');
exports.getShopEmail = function (err, cb) {
    shopify.getBaseObj('shop', null, function(shop) {
        cb(null, shop.email);
    });
};
exports.createCustomer = function(customer, callback) {
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
    logger.logObject(shopifyCustomer, "shopifyCustomer");
    try {
        shopify.post('customers', shopifyCustomer, function(newCustomer) {
            process.nextTick(function (){
                logger.log('posting shopifyCustomer complete');
                logger.logObject(arguments,'posting shopifyCustomer return args');
                callback(null, null);
            });
        });
 
    } catch (shopPostError) {
        logger.log('failed');
        logger.logObject({error: shopPostError, customer: shopifyCustomer }, "shopPostError");
                process.nextTick(function (){
                    logger.log('posting shopifyCustomer failed'); 
                    callback(null, null);
            });
    }
    
};