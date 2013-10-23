var qconf = require('qconf'),
    config = qconf();

var sendgrid  = require('sendgrid')(config.get('SENDGRID_USER'), config.get('SENDGRID_PASSWORD'));
var Email     = sendgrid.Email;
var shopify = require('../lib/shopify');

exports.sendEmail = function (details, callback){
    shopify.getShopEmail(function (err, email) {
        var message = new Email({
          to: email,
          from: details.from || email,
          subject: 'Tipline Email',
          text: details.message
        });
        if( details.hasAttachment) {
            message.addFile({  path: details.attachment });
        }
        sendgrid.send(message, callback);


    });
};
