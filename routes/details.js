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


        if (err) {
            res.send(200, err);
        } else {
            var member = {
                first_name: doc.first_name,
                last_name: doc.last_name,
                email: doc.email,
                amount: doc.amount,
                repeat: doc.repeat,
                donation_amount: doc.amountToDonate || (doc.amount - 5)
            };
            res.send(200, member);
        }
    });
};

exports.update = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    var email = req.query.email;
    var amount = req.body.amount;

    var customers = require('../lib/db')('customer');
    var customer_updates = require('../lib/db')('customer_update');
    customers.findOne({ email: email }, function (err, doc) {
        if (err) {
            res.send(200, err);
        } else {
            doc.amountToDonate = amount;
            customer_updates.save(doc, function () {
               res.send(200);
           });
        }
    });
};


exports.cancel = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    var email = req.query.email;

    var customers = require('../lib/db')('customer');
    var customer_updates = require('../lib/db')('customer_update');
    customers.findAndModify({
                    query: { email: email },
                    update:{ $set: { repeat: false }},
                    new: false
                }, function (err, doc) {
        if (err) {
            res.send(200, err);
        } else {
            doc.stoppedDonation = new Date();
            customer_updates.save(doc, function () {
               res.send(200);
           });
        }
    });
};