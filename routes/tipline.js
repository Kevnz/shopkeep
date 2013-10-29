exports.index = function(req, res){
  res.render('tipline', { title: 'Taxpayers Union', subtitle:'' });
};

var qconf = require('qconf'),
    config = qconf();
var azure = require('azure');
var logtastic = require('../lib/db')('logtastic');



exports.saveTip = function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    

    try {
        var Guid = require('guid');

        var tips =  require('../lib/db')('tips');
        var tipster = {};
        logtastic.save({message:"at the start of post build"});
        tipster.name = req.body.name;
        tipster.phone_number = req.body.phone_number;
        tipster.email = req.body.email;
        tipster.message = req.body.message;
        tipster.created_on = new Date();
        tipster.id = Guid.create().toString();
        tipster.ip_address = req.header('x-forwarded-for') || req.connection.remoteAddress;
        logtastic.save({message:"at the end of post build"});
        try {
            if (req.body.files) {
                tipster.savedFile = 'yes';
                logtastic.save(req.body.files);
                tipster.filelocation = req.files[0].path;
            }
        }
        catch (e) {
            logtastic.save({message:"failed files", error: e});
        }
        logtastic.save({message:"at the end of file check"});
        logtastic.save(tipster);
        tips.save(tipster, function (err, obj) {
            var sender = require('../lib/email');
            logtastic.save({message:"at the end of tip save"});
            sender.sendEmail(tipster, function (err, obj) {
                if(err) {
                    res.send(500, { error: 'something is wrong'});
                } else {
                    res.send(200, {message: 'all good'});
                }
            });
        });
    } catch(failed) {
        logtastic.save({message:"in the catch", error: failed });
        res.send(200, {problem: 'yes', err: failed});
    }
};