exports.index = function (req, res) {
    var db = require('../lib/db')('customer');

    db.find({ paid: true})
      .sort({created_on: -1}, function (err, paidCustomers) {
        res.render('admin', { title: 'Members and donations', customers:paidCustomers });
    });

};

exports.exportCustomers = function(req, res){
    var customers ={};
    customers.cols = [{
        caption:'Name',
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
    },{
        caption:'Email',
        type:'string' 
    },{
        caption:'Phone Number',
        type:'string'
    },{
        caption:'Amount',
         type:'currency'                
      }];
    var db = require('../lib/db')('customer');
    db.find({ paid: true})
      .sort({created_on: -1}, function (err, paidCustomers) {
        
          customers.rows = [
         ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
         ["e", new Date(2012, 4, 1), false, 2.7182],
          ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.2]   
      ];


        customers.rows=[];
        for (var i = 0; i < paidCustomers.length; i++) {
            if (paidCustomers[i].email.indexOf('the-kev') === -1) {
                customers.rows.push([paidCustomers[i].first_name + ' ' + paidCustomers[i].last_name, paidCustomers[i].email, paidCustomers[i].phone_number, paidCustomers[i].amount]);
            }
        }
        var nodeExcel = require('excel-export');
        var result = nodeExcel.execute(customers);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "CustomersReport.xlsx");
        res.end(result, 'binary');



    });

};