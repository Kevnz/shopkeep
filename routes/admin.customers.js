exports.index = function (req, res) {
    var db = require('../lib/db')('customer');

    db.find({ paid: true})
      .sort({created_on: -1}, function (err, paidCustomers) {
        res.render('admin', { title: 'Members and donations', customers:paidCustomers });
    });

};

exports.exportCustomers = function(req, res){
    var customers ={};
    customers.cols = [
    {
        caption:'Name',
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
    },{
        caption:'EmailAddress',
        type:'string' 
 
    },{
        caption:'FirstName',
        type:'string' 
    },{     
        caption:'LastName',
        type:'string' 
    },{ 
        caption:'POAttentionTo',
        type:'string'
    },{
      caption:'POAddressLine1',
        type:'string'
    },{
      caption:'POAddressLine2',
        type:'string'
    },{
      caption:'POAddressLine3',
        type:'string'
    },{
      caption:'POAddressLine4',
        type:'string'
    },{
      caption:'POCity',
        type:'string'
    },{
      caption:'PORegion',
        type:'string'
    },{
        caption:'POPostalCode',
        type: 'string'
    },{ 
        caption:'POCountry',
        type: 'string'
    },{
        caption:'SAAttentionTo',
        type: 'string'
    },{
        caption:'SAAddressLine1',
        type: 'string'
    },{
        caption:'SAAddressLine2',
        type: 'string'
    },{
        caption:'SAAddressLine3',
        type: 'string'
    },{
        caption:'SAAddressLine4',
        type: 'string'
    },{
        caption:'SACity',
        type: 'string'
    },{
        caption:'SARegion',
        type: 'string'
    },{
        caption:'SAPostalCode',
        type: 'string'
    },{
        caption:'SACountry',
        type: 'string'
    },{
        caption:'PhoneNumber',
        type: 'string'
    },{
        caption:'FaxNumber',
        type: 'string'
    },{
        caption:'MobileNumber',
        type: 'string'
    },{
        caption:'DDINumber',
        type: 'string'
    },{
        caption:'SkypeName',
        type: 'string'
    },{
        caption:'BankAccountName',
        type: 'string'
    },{
        caption:'BankAccountNumber',
         type:'currency'                
      },{
          caption:'BankAccountParticulars',
        type: 'string'
    },{
        caption:'BankAccountCode',
        type: 'string'
    },{
        caption:'BankAccountReference',
        type: 'string'
    },{
        caption:'TaxNumber',
        type: 'string'
    },{
        caption:'AccountsReceivableTaxCodeName',
        type: 'string'
    },{
        caption:'AccountsPayableTaxCodeName',
        type: 'string'
    },{
        caption:'Website',
        type: 'string'
    },{
        caption:'Discount',
        type: 'string'
    },{
        caption:'DueDateBillDay',
        type: 'string'
    },{
        caption:'DueDateBillTerm',
        type: 'string'
      },{
        caption:'DueDateSalesDay',
        type: 'string'
      },{
        caption:'DueDateSalesTerm',
        type: 'string'
      }];
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
                  paidCustomers[i].first_name + ' ' + paidCustomers[i].last_name, 
                  paidCustomers[i].email, 
                  paidCustomers[i].first_name,
                  paidCustomers[i].last_name,
                  '',
                  paidCustomers[i].address1,
                  paidCustomers[i].address2 || '',
                  '',
                  '',
                  paidCustomers[i].address3,
                  '',
                  paidCustomers[i].postcode,
                  'New Zealand',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  paidCustomers[i].phone_number || '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '']);
            }
        }
        var nodeExcel = require('excel-export');
        var result = nodeExcel.execute(customers);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "CustomersReport.xlsx");
        res.end(result, 'binary');



    });

};