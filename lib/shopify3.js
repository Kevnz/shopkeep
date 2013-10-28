/*
API Key b312c2a799104ac529ef8e452f9a4d42
Password    0180857a22d7148608e1c575c44d5eb3
Shared Secret   9b10df8d7170c7c4660077757c1795b2
URL Format  https://apikey:password@hostname/admin/resource.xml
Example URL https://b312c2a799104ac529ef8e452f9a4d42:0180857a22d7148608e1c575c44d5eb3@taxpayersunion.myshopify.com/admin/orders.xml

*/


var nodify = require('nodify-shopify');

var logger = require('./logger');

var shop = 'taxpayersunion',
	token = '0180857a22d7148608e1c575c44d5eb3',
	apiKey = 'b312c2a799104ac529ef8e452f9a4d42',
	secret = '9b10df8d7170c7c4660077757c1795b2';

var session = nodify.createSession(shop, token, apiKey, secret);
 


exports.getShopEmail = function (err, cb) {
    shopnode.shop.get(function(err, req, res, shop){
        cb(err, shop.email);
    });
};
exports.createCustomer = function shopifyCreateCustomer (customer, callback) {
    logger.logObject(customer, "customer to create");
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
    	session.customer.create (shopifyCustomer, function shopifyCustomerCallback (err, result) {

            logger.logObject(arguments, 'args from shopify post');
            logger.logObject(err, 'shopify call error object');
            callback(null, null);
    	});
    } catch (shopPostError) {
        logger.log('failed');
        logger.logObject(shopPostError, "shopPostError");
        callback(null, null);
    }
    
};