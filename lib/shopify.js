var Shopnode = require('shopnode');

// Basic Authentication
/*
var shopnode = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'b312c2a799104ac529ef8e452f9a4d42',
    password:'0180857a22d7148608e1c575c44d5eb3',
    useBasicAuth:true
});
*/
var shopnode1 = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'9cfc63a34418fb93967b4c50ba4bb845',
    password:'0ded90a0bf6da7823346b826bbeb4d7c',
    useBasicAuth:true
});
var shopnode3 = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'5b02994247b537169f606200c3d85f47',
    password:'81ad8c20832408286c60e18b14e346df',
    useBasicAuth:true
});

var shopnode2 = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'b312c2a799104ac529ef8e452f9a4d42',
    password:'0180857a22d7148608e1c575c44d5eb3',
    useBasicAuth:true
});
/*
API Key b312c2a799104ac529ef8e452f9a4d42
Password    0180857a22d7148608e1c575c44d5eb3
Shared Secret   9b10df8d7170c7c4660077757c1795b2
URL Format  https://apikey:password@hostname/admin/resource.xml
Example URL https://b312c2a799104ac529ef8e452f9a4d42:0180857a22d7148608e1c575c44d5eb3@taxpayersunion.myshopify.com/admin/orders.xml

*/

// OAuth 2.0
/*
var shopnode = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'9cfc63a34418fb93967b4c50ba4bb845',
    sharedKey:'a38fe3a45b0d087579106df550fa3508'
});

*/

var shopnode = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'458baaa60d77f1e1385276567e3b2bac',
    password:'45a605eb92bae323b9bacbdc79ca66fd',
    useBasicAuth:true
});

var logger = require('./logger');
/* shopify error object */

var errorObject = {
            "_isError": true,
            "name": "HttpError",
            "httpCode": 422,
            "restCode": {
                "httpCode": 500,
                "message": "UnknownError"
            },
            "message": {
                "errors": {
                    "email": [
                        "has already been taken"
                    ]
                }
            },
            "details": {
                "expected": [
                    200,
                    201
                ],
                "statusCode": 422,
                "headers": {
                    "server": "nginx",
                    "date": "Tue, 29 Oct 2013 22:15:02 GMT",
                    "content-type": "application/json; charset=utf-8",
                    "transfer-encoding": "chunked",
                    "status": "422 Unprocessable Entity",
                    "x-shopid": "2689345",
                    "x-shopify-asset-version": "d1eca0f863b6654d60934b3c0d88e78d73aa05bd",
                    "x-shopify-shop-api-call-limit": "1/500",
                    "http_x_shopify_shop_api_call_limit": "1/500",
                    "x-frame-options": "DENY",
                    "x-ua-compatible": "IE=Edge,chrome=1",
                    "set-cookie": [
                        "_secure_session_id=4c57b9ef63a4e9ad3a6856eaea36713e; path=/; secure; HttpOnly"
                    ],
                    "x-request-id": "ce74cd499baac1233ba12cf59671f4d1"
                },
                "object": {
                    "errors": {
                        "email": [
                            "has already been taken"
                        ]
                    }
                }
            }
        }

var shouldRetry = function (error) {
    if(error === null) {
        return false;
    }

    if (error._isError) {
        //looking for
        var errResult = true; 
        try {
            if (error.message && error.message.errors && error.message.errors.email && error.message.errors.email[0] === "has already been taken") {
                errResult =  false;
            }
        } catch (ifErr) {

        }
        return errResult;
    }
    return true;
}
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
            ]
        }
    };
    /*
    ,
            "metafields": [
                {
                    "key": "member",
                    "value": customer.join || 'no',
                    "value_type": "string",
                    "namespace": "global"
                },
                {
                    "key": "member",
                    "value": customer.join || 'no',
                    "value_type": "string",
                    "namespace": "global"
                },
                {
                    "key": "donation",
                    "value": customer.amount > 5 ? customer.amount - 5 : '0',
                    "value_type": "string",
                    "namespace": "global"
                }
            ]

            */
    logger.logObject(shopifyCustomer, "shopifyCustomer");
    try {
        shopnode.customers.post(shopifyCustomer,function shopifyCreateCallback (err, req, res, obj) {
            logger.logObject(arguments, 'args from shopify post');
            if (shouldRetry(err) {
                shopnode1.customers.post(shopifyCustomer,function shopify1CreateCallback (err1, req, res, obj){
                    logger.logObject(arguments, 'args from 2nd shopify post');
                    if (shouldRetry(err1) {
                        shopnode2.customers.post(shopifyCustomer,function shopify1CreateCallback (err2, req, res, obj) {
                            logger.logObject(arguments, 'args from 2nd shopify post');
                            if (shouldRetry(err2)) {
                                shopnode3.customers.post(shopifyCustomer,function shopify1CreateCallback (err3, req, res, obj) {
                                    logger.logObject(arguments, 'args from 3rd shopify post');
                                    callback(err3, null);
                                });
                            } else {
                               callback(null, null);
                            }
                            callback(null, null);
                        });
                    } else {
                       callback(null, null);
                    }
                });
            } else {
                callback(null, null);
            }
            
        });
    } catch (shopPostError) {
        logger.logObject(shopPostError, "shopPostErrortrycatch");
        callback(null, null);
    }
};