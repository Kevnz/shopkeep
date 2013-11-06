exports.index = function (req, res) {
    var db = require('../lib/db')('customer');

    db.find({ paid: true})
      .sort({created_on: -1}, function (err, paidCustomers) {
        res.render('admin', { customers:paidCustomers });
    });

};