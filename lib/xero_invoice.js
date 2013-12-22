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

var generateXML = function (customer) {
    var xmlToSend = '<?xml version="1.0" encoding="utf-8"?>\r\n';
    xmlToSend =xmlToSend + '<Request>\r\n';//<Invoices>\r\n';
    var easyxml = require('easyxml');
    easyxml.configure({ manifest: false,rootElement: 'Invoice'  });
    var invoice = genJoiningInvoice(customer);
    var xmlSnip = easyxml.render(invoice.Invoice).toString();
    xmlToSend = xmlToSend + xmlSnip;
        //Invoices.Invoices.push(invoice);
 
            if (customer.amount > 5) {
                var d = genDonationInvoice(customer);
                xmlToSend = xmlToSend + easyxml.render(d.Invoice).toString();
            }
    xmlToSend +='</Request>\r\n';
    console.log(xmlToSend);
    return xmlToSend;
};
var generateDonorXML = function (customer) {
    var xmlToSend = '<?xml version="1.0" encoding="utf-8"?>\r\n';
    xmlToSend =xmlToSend + '<Request>\r\n<Invoices>\r\n';
    var easyxml = require('easyxml');
    easyxml.configure({ manifest: false,rootElement: 'Invoice'  });
 
    var d = genDonationInvoice(customer);
    xmlToSend = xmlToSend + easyxml.render(d.Invoice).toString();
    xmlToSend +='</Invoices>\r\n</Request>\r\n';
    console.log(xmlToSend);
    return xmlToSend;
};
exports.allInvoices = function (customers, callback) {
    
    var config = require('./xero_details').config;
    //var Xero = require('xero');
    //var xero = new Xero(config.key, config.secret, config.rsa);
    var Invoices = { Invoices : []};
    var easyxml = require('easyxml');
    var js2xmlparser = require("js2xmlparser");
    //easyxml.configure({ manifest: false,rootElement: 'Invoice'  });
    var xmlToSend = '<?xml version="1.0" encoding="utf-8"?>\r\n';
    xmlToSend =xmlToSend + '<Invoices>';
    for (var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        var invoice = genJoiningInvoice(customers[i]);
        var xmlSnip = easyxml.render(invoice.Invoice).toString();
        console.log(xmlSnip);
        //xmlToSend = xmlToSend + xmlSnip;
        //Invoices.Invoices.push(invoice);
 
            if (customer.amount > 5) {
                var d = genDonationInvoice(customer);
                xmlToSend = xmlToSend + easyxml.render(d.Invoice).toString();
                Invoices.Invoices.push(d);
            }
    }
    xmlToSend +='</Invoices>';
    //console.log(Invoices);
    var x = easyxml.render(Invoices.Invoices);
    var convert = require('data2xml')({});
    console.log(Invoices.Invoices.length);
    var jsxml = js2xmlparser("Invoices", Invoices.Invoices);
    var d2x = convert('Invoices', Invoices.Invoices);
    //console.log(d2x);
    //console.log(jsxml);
    callback(null, xmlToSend);

};
exports.raise = function (customer, callback) {
 
    var config = require('./xero_details').config;
    var xeroJSON = genJoiningInvoice(customer);
    var Xero = require('./xero_api');
    var xero = new Xero(config.key, config.secret, config.rsa);

     
 
    var xml = generateXML(customer);
     
    xero.call('POST', '/Invoices', xml, function(err, json) {
        if (err) {
            console.log('error');
            console.error(err);
            return callback(err, xml);
        }
 
        return callback(false, xml);
    });
};
exports.raiseDonor = function (customer, callback) {
    var config = require('./xero_details').config;
     var Xero = require('./xero_api');
    var xero = new Xero(config.key, config.secret, config.rsa);

    //var xml = generateXML(customer);
    var xml = generateDonorXML(customer);
     
    xero.call('POST', '/Invoices', xml, function(err, json) {
        if (err) {
            console.log('error');
            console.error(err);
            return callback(err, xml);
        }
 
        return callback(false, xml);
    });
    return callback(false, xml);
};


exports.raiseDonation = function (customer, callback) {
    var config = require('./xero_details').config;
 

    var xml = generateXML(customer);
    var xml = generateDonorXML(customer);
     
    xero.call('POST', '/Invoices', xml, function(err, json) {
        if (err) {
            console.log('error');
            console.error(err);
            return callback(err, xml);
        }
 
        return callback(false, xml);
    });
    return callback(false, xml);
}