exports.exportCustomers = function(req, res) {
    var customers ={};
    var db = require('../lib/db')('customer');
    db.find({ paid: true })
      .sort({created_on: -1}, function (err, customers) {
        var donDB = require('../lib/db')('donations');
        var recurringDB = require('../lib/db')('customer');
        donDB.find({ paid: true})
            .sort({created_on: -1}, function (err, donors) {
            recurringDB.find({
                "paid": true,
                "repeat": true,
                "donationAmount": { "$gt": 0 }

            }).sort({created_on: -1}, function (err, recurring) {
                var XlsxTemplate = require('xlsx-template');
                var fs = require('fs');
                var path = require('path');
                // Load an XLSX file into memory
                fs.readFile(path.join(__dirname, 'template', 'Book1.xlsx'), function(err, data) {
                    console.log(err);
                    console.log(data)
                    // Create a template
                    var template = new XlsxTemplate(data); 
                    // Replacements take place on first sheet
                    var sheetNumber = 1;

                    // Set up some placeholder values matching the placeholders in the template
             
                    // Perform substitution
                    console.log('sub');
                    template.substitute(sheetNumber, { customers: customers } );
                    template.substitute(2, { donors: donors } );
                    template.substitute(3, {customers: recurring });
                    // Get binary data

                    var result = template.generate();

                    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                    res.setHeader("Content-Disposition", "attachment; filename=" + "CustomersReport.xlsx");
                    res.end(result, 'binary');

                });
            });
        });
 




    });

};