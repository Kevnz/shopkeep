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
var log = require('../lib/db')('logtastic');
exports.sendEmail = function (details, callback){
    log.save('shopify call - before');
    shopify.getShopEmail(function (err, email) {
        log.save('shopify call - after');
        var message = new Email({
          to: 'kevin.isom@gmail.com',
          from: details.from || email,
          subject: 'Tipline Email',
          text: template(details) + 'test'
        });
        log.save('message create');
        if( details.hasAttachment) {
            log.save('has attachment(filename)');
            message.addFile({ path: details.filelocation });
        }
        log.save('before send');
        sendgrid.send(message, callback);


    });
};
