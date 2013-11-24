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
            Reference: 'Payment from user ' + customer.id,
            Date: customer.created_on,
            DueDate: customer.created_on,
            LineAmountTypes: 'Inclusive',
            LineItems: {LineItem: { Description: 'Joining Fee', Quantity:1,UnitAmount: 5.00, AccountCode:202  } }
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
            Reference: 'Payment from user ' + customer.id,
            Date: customer.created_on,
            DueDate: customer.created_on,
            LineAmountTypes: 'NoTax',
            LineItems: {LineItem: { Description: 'Donation – Thank You.', Quantity:1,UnitAmount: customer.amount - 5, AccountCode:211  } }
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
             var Invoices2 = { Invoices : d};
            xero.call('POST', '/Invoices', Invoices2, function(err, json) {
                callback(null, json)
            });
        }
        });
    }
    


};
exports.raise = function (customer, callback) {
 
    var config = require('./xero_details').config;
    var xeroJSON = genJoiningInvoice(customer);
    var Xero = require('xero');
    var xero = new Xero(config.key, config.secret, config.rsa);

    var Invoices = { Invoices : xeroJSON};

    console.log(Invoices);
    var d = genDonationInvoice(customer);
    var Invoices2 = { Invoices : d};
    xero.call('POST', '/Invoices', Invoices2, function(err, json) {
        if (err) {
            console.log('error');
            console.error(err);
            return callback(err, Invoices);
            ;
        }
        if (customer.amount > 5) {

            console.log('second post');
            xero.call('POST', '/Invoices', Invoices, function(err, json) {
                return callback(false, json);
            });
        }
        return callback(false, Invoices);
    });
};