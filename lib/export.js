exports.exportCustomers = function(req, res) {
    var customers ={};
    customers.cols = [
    {
        caption:'FirstName',
        type:'string'
    },{
        caption:'LastName',
        type:'string'
    },
    {
        caption:'EmailAddress',
        type:'string'
    },
    {
        caption: 'Phone', type: 'string'
    },
    {
        caption: 'Created On', type: 'string'
    },
    {
        caption: 'Street', type: 'string'
    },
    {
        caption: 'Suburb', type: 'string'
    },
    {
        caption: 'City', type: 'string'
    },
    {
        caption: 'Post Code', type: 'string'
    },
    {
        caption: 'Total Amount', type: 'string'
    },
    {
        caption: 'Donation Amount', type: 'string'
    }
    ];
    var db = require('../lib/db')('customer');
    db.find({ paid: true})
      .sort({created_on: -1}, function (err, paidCustomers) {
        
           
/*
var moment = require('moment')
var u = moment.utc(dstring);
console.log(moment(dstring)._d);

*/
        customers.rows=[];
        for (var i = 0; i < paidCustomers.length; i++) {
            if (paidCustomers[i].email.indexOf('the-kev') === -1) {
                customers.rows.push([
                  paidCustomers[i].first_name,
                  paidCustomers[i].last_name,
                  paidCustomers[i].email,
                  paidCustomers[i].address1,
                  paidCustomers[i].address2 || '',
                  paidCustomers[i].address3,
                  paidCustomers[i].postcode,
                  paidCustomers[i].phone_number || '',
                  paidCustomers[i].amount,
                  paidCustomers[i].donationAmount || (paidCustomers[i].amount - 5)
                  ]);
            }
        }
        var nodeExcel = require('./excel');
        var result = nodeExcel.execute(customers);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "CustomersReport.xlsx");
        res.end(result, 'binary');



    });

};