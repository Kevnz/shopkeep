exports.index = function (req, res) {
    var email = req.query.email;

    var customers = require('../lib/db')('customer');

    customers.findOne({email: email}, function (err, doc) {
        if (err) {
            res.send(200, err);
        } else {
            res.send(200, doc);
        }
    });
};

exports.update = function (req, res) {
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