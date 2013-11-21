/*
<Invoices>
  <Invoice>
    <Type>ACCREC</Type>
    <Contact>
      <Name>Martin Hudson</Name>
    </Contact>
    <Date>2013-11-20T00:00:00</Date>
    <DueDate>2013-11-27T00:00:00</DueDate>
    <LineAmountTypes>Exclusive</LineAmountTypes>
    <LineItems>
      <LineItem>
        <Description>Monthly rental for property at 56a Wilkins Avenue</Description>
        <Quantity>4.3400</Quantity>
        <UnitAmount>395.00</UnitAmount>
        <AccountCode>200</AccountCode>
      </LineItem>
    </LineItems>
  </Invoice>
</Invoices>
*/
var genJoiningInvoice = function (customer) {
    return {
        Invoice: {
            Type: 'ACCREC',
            Contact: {
                Name: customer.first_name + ' ' + customer.last_name
            },
            Date: customer.created_on,
            DueDate: customer.created_on,
            LineAmountTypes: 'Inclusive',
            LineItems: {LineItem: { Description: 'Joining Fee', Quantity:1,UnitAmount: 5.00, AccountCode:200  } }
        }
    };
};
var genDonationInvoice = function (customer) {
    return {
        Invoice: {
            Type: 'ACCREC' ,
            Contact: {
                Name: customer.first_name + ' ' + customer.last_name
            },
            Date: customer.created_on,
            DueDate: customer.created_on,
            LineAmountTypes: 'NoTax',
            LineItems: {LineItem: { Description: 'Donation', Quantity:1,UnitAmount: customer.amount - 5, AccountCode:200  } }
        }
    };
};
var generateJSON = function (customer) {

    var donationInvoice = genDonationInvoice(customer);
    var inv = {
         
            Invoice: {
            Type: 'ACCREC',
            Contact: {
                Name: customer.first_name + ' ' + customer.last_name
            },
            Date: customer.created_on,
            DueDate: customer.created_on,
            LineAmountTypes: 'Inclusive',
            LineItems: {LineItem: { Description: 'Joining Fee', Quantity:1,UnitAmount: 5.00, AccountCode:200  } }
        }
     
    };

    if(customer.amount > 5) {
        //inv.Invoices.push(donationInvoice);
    }
    return inv;
};
exports.allInvoices = function (customers, callback) {
    
    var config = require('./xero_details').config;
    var Xero = require('xero');
    var xero = new Xero(config.key, config.secret, config.rsa);
    for (var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        var invoice = generateJSON(customers[i]);
        var Invoices = { Invoices : invoice};
        console.log(Invoices);
        xero.call('POST', '/Invoices', Invoices, function(){
            if(customer.amount > 5) {
            var d = genDonationInvoice(customer);
            xero.call('POST', '/Invoices', d, function(err, json) {
                
            });
        }
        });
    }
    


};
exports.raise = function (customer, callback) {
    var config = require('./xero_details').config;
    var xeroJSON = generateJSON(customer);
    var Xero = require('xero');
    var xero = new Xero(config.key, config.secret, config.rsa);
    console.log(xeroJSON);
    var Invoices = { Invoices : xeroJSON};
    xero.call('POST', '/Invoices', Invoices, function(err, json) {
        if (err) {
            console.error(err);
            callback(err, null);
        }
        if(customer.amount > 5) {
            var d = genDonationInvoice(customer);
            xero.call('POST', '/Invoices', d, function(err, json) {
                callback(false, json);
            });
        }
        return callback(false, json);
    });
};