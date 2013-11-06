exports.index = function (req, res) {
    var db = require('../lib/db')('customer');

    db.find({ paid: true})
      .sort({created_on: -1}, function (err, paidCustomers) {
        console.log(paidCustomers.length);
        db.aggregate([
            { $match: { paid: true }},
            { $group: { _id: null,
               count: { $sum: 1 } } }],
               function (err, paidCount) {
                console.log('paidCount ' + paidCount);
                res.render('admin', { customers:paidCustomers, total: paidCount});
               }
            );
    });

};