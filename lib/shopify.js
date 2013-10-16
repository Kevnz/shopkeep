var Shopnode = require('shopnode');

// Basic Authentication
var shopnode = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'b312c2a799104ac529ef8e452f9a4d42',
    password:'0180857a22d7148608e1c575c44d5eb3',
    useBasicAuth:true
});

// OAuth 2.0
var shopnode = new Shopnode({
    storeHost:'taxpayersunion.myshopify.com',
    apiKey:'b312c2a799104ac529ef8e452f9a4d42ey',
    sharedKey:'9b10df8d7170c7c4660077757c1795b2'
});


exports.module = {
    createCustomer: function(customer, callback) {
            shopnode.customers.post({
            "customer": {
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
        },function(err, req, res, obj){
            if(err) {
                process.nextTick(function (){
                    callback(err);
                });
            } else {
                process.nextTick(function (){
                    callback(null, obj);
                });
            }
        });
    }
};