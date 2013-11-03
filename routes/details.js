exports.index = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    var email = req.query.email;
    console.log(email);
    var customers = require('../lib/db')('customer');

    customers.findOne({email: email, paid:true }, function (err, doc) {
        console.log(arguments);
        var member = {
            first_name: doc.first_name,
            last_name: doc.last_name,
            email: doc.email,
            amount: doc.amount,
            repeat: doc.repeat
        };
        if (err) {
            res.send(200, err);
        } else {
            res.send(200, doc);
        }
    });
};

exports.update = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    var email = req.body.email;
    var amount = req.body.amount;
    var repeat = req.body.repeat;

    var customers = require('../lib/db')('customer');

    customers.findOne({email: email}, function (err, doc) {
        if (err) {
            res.send(200, err);
        } else {
            res.send(200, doc);
        }
    });
};