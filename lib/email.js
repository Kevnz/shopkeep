var qconf = require('qconf'),
    config = qconf();

var sendgrid  = require('sendgrid')(config.get('SENDGRID_USER'), config.get('SENDGRID_PASSWORD'));
var Email     = sendgrid.Email;
var shopify = require('../lib/shopify');
var source = "Message: {{message}} \r\n" +
             "Name:{{name}} \r\n" +
             "Phone:{{phone_number}} \r\n" +
             "Recorded from {{ip_address}}";
var Handlebars = require('handlebars');
var template = Handlebars.compile(source);

exports.sendEmail = function (details, callback){
    shopify.getShopEmail(function (err, email) {
        var message = new Email({
          to: 'kevin.isom@gmail.com',
          from: details.from || email,
          subject: 'Tipline Email',
          text: template(details)
        });
        if( details.hasAttachment) {
            message.addFile({ path: details.filelocation });
        }
        sendgrid.send(message, callback);


    });
};
