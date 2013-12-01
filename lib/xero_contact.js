var heredoc = require('heredoc');
var rsa_key = heredoc(function () {/*
MIICXAIBAAKBgQCuIVl2i0beiQcMcJ/vSZdBl3pqhg0+vY+ri3p3hsfG5u8zV1xC
sgo3JUxmDVdqVnr015Xu7d+l1Fmw7tBW/WPtdDaTWikai+IlfafCZQCDXSpYj546
xarFrA1FxlDFDVX3E4NBx1r4QujBFWdb33V91UMvJ2n32pbFZrf2WKN5AQIDAQAB
AoGAJ/COTJp1juVvMHNEu+XtQ6Yy9ev5bcKdCYPcez325LBjfSs0hjfAEBYGCAJX
YpSjbzVjtoHpImgqimK8drd4C8YA9nJZJcEOB6VWR0LvXW1CMTMo+yt8KctvCMI4
0EkPMTd/Jwsxf5kmdB+gW85Fg3RCpWTKZ4ciRHK8yks18gECQQDcqeAU/9v/JnPv
UqurSNrhc19JrYhzvBPdxXGrwkrVJ8yTGLhC41VikZ79hrjb0tzFK2N/Kopdg4Zr
Vf8ZIZMZAkEAygPWOmekSRelPJ9DQZMjkWJBzKWnwNhlpyoxRbf9HeT3BjM/XIn7
QLJ2Uu4z3Q5eIzMEEj99ifzXWi++KZF6KQJBAJxkCVzYuaLsLd7ASMrsp7SBgFdH
lh3wfmP/O8Dvwvmva14VdwJw/GMPsg8dHIcvuyhCyBGopMgCH5KTMGkvUoECQEWN
dKC/Nk0EGxv4KYvWQRS5I7Z2An/fAYDAgh5i7n7waix0UIhn6V2pFBwRb0HYxIiR
9ADkYzCzIOIoNezR7aECQClbj0bpnHJIWpAOyVsHdqAVmMAOrLcvic4sJtiKwpxf
F2BNxXCWITjUhcMa5/cfXpBrW1V+DeSf6GR1h9xFCVw=
*/});
var CONSUMER_KEY = 'M31HHHD3C4BD7S5WFZEZFTZ0R4GKYS';
var CONSUMER_SECRET = 'D6JRYXSYYN9RMKIKSVUM5NXCJ3BKEP';


var generateXML = function (contact) {
    var xml = ['<Contact>',
                '<Name>' + contact.first_name + ' ' + contact.last_name + '</Name>',
                '<FirstName>' + contact.first_name.trim() + '</FirstName>',
                '<LastName>' + contact.last_name.trim() + '</LastName>',
                '<EmailAddress>' + contact.email.trim() + '</EmailAddress>',
                '<Addresses>',
                '<Address>',
                '<AddressType>STREET</AddressType>',
                '<AddressLine1>' + contact.address1.trim() +'</AddressLine1>',
                '<AddressLine2>'+ (contact.address2 || '-').trim() + '</AddressLine2>',
                '<City>' + contact.address3.trim() + '</City>',
                '<PostalCode>' + contact.postcode + '</PostalCode>',
                '<Country>New Zealand</Country>',
                '</Address>',
                '</Addresses>',
                '<DefaultCurrency>NZD</DefaultCurrency>',
                '<IsSupplier>false</IsSupplier>',
                '<IsCustomer>true</IsCustomer>',
                '</Contact>'];
    return xml.join('\r\n');
};

var generateJSON = function (contact) {
    var ent = {
            'Contact': {
                'Name' : contact.first_name + ' ' + contact.last_name,
                'FirstName': contact.first_name.trim(),
                'LastName' : contact.last_name.trim(),
                'EmailAddress': contact.email.trim(),
                Addresses: {
                    Address: {
                        AddressType:'STREET',
                        AddressLine1: contact.address1.trim(),
                        AddressLine2: (contact.address2 || '-').trim(),
                        City: contact.address3.trim(),
                        PostalCode: contact.postcode,
                        Country:'New Zealand',
                    }
                },
                DefaultCurrency:'NZD',
                IsSupplier:false ,
                IsCustomer:true
                }
            };
    return ent;
};
exports.post = function (entity, callback) {

};
exports.createContact = function (customer, callback) {
    var config = require('./xero_details').config;
    var xeroJSON = generateJSON(customer);
    var Xero = require('xero');
    console.log(config.rsa);
    var xero = new Xero(config.key, config.secret, config.rsa);
    console.log(xeroJSON);
    
    xero.call('POST', '/Contacts', xeroJSON, function(err, json) {
        if (err) {
            console.error(err);
            callback(err, null);
        }
        return callback(false, json);
    });
};