


var qconf = require('qconf'),
    config = qconf(),
    donations = require('./lib/db')('donations');
var Guid = require('guid');

var Ids = [
    { id:'43710d55-59ca-87e0-34ea-9ba4aaadb159', dpsBillingId:'0000010027561075', amount:'5.00'} ,
    {id:'84932926-3487-9f55-92b3-6a58fba644a3', dpsBillingId:'0000010027563651', amount:'50.00'},
    {id:'cc17119d-5e8e-4845-3bd4-a381bccdcae3', dpsBillingId:'0000010027571386',amount: '5.00'},
    {id:'Payment from user 11289523-d413-21cd-67e5-62d0fdc9c6cd', dpsBillingId:'0000010027773766', amount:'5.00'},X
    {id:'Payment from user 69f4c031-385a-08c7-4cbd-f9af3253268b', dpsBillingId:'0000010027918301',amount: '5.00'},
    {id:'Payment from user 7ff21fd2-e17d-2eb4-6029-9b8eed9f10b6', dpsBillingId:'0000010027621453',amount: '25.00'},
    {id:'Payment from user 158c910f-28c9-9751-fed9-416f1e35a893', dpsBillingId:'0000010027664279', amount:'5.00'}
];

 
var pxpay = require('pxpay');

for (var i = 1; i < Ids.length; i++) {
    
//var i = 0;
      var options = {
            user: config.get('dps-user-prod'),
            password: config.get('dps-password-prod'),
            dpsBillingId: Ids[i].dpsBillingId,
            amount:  Ids[i].amount,
            reference: 'Payment from user ' + Ids[i].id,
            line1: 'Donation to the Taxpayers Union',
            TxnId: 'trans-'+ Guid.create().toString(),
            successURL: 'http://tradeshop.azurewebsites.net/rebillsuccess?donation=',
            failURL: 'http://tradeshop.azurewebsites.net/rebillfail?donation='
        };
 
        pxpay.request(options, function pxpayCb (err, data) {
            console.log('args', arguments);
        });
       

};
         