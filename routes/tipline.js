exports.index = function(req, res){
  res.render('tipline', { title: 'Taxpayers Union', subtitle:'' });
};

var qconf = require('qconf'),
    config = qconf();
var saveFile = function saveFileFromPost (file, id) {
 
    var data = fs.readFileSync(file.path);
    var newPath = __dirname + "/uploads/" + id + '-' + file.name ;
    logtastic.save({message:"gonna write to " + newPath});
    fs.writeFileSync(newPath, data);
    return newPath;
}
exports.saveTip = function (req, res) {
    try {
        var Guid = require('guid');
        var logtastic = require('../lib/db')('logtastic');
        var tips =  require('../lib/db')('tips');
        var tipster = {};
        logtastic.save({message:"at the start of post build"});
        tipster.name = req.body.name;
        tipster.phone_number = req.body.phone_number;
        tipster.message = req.body.message;
        tipster.created_on = new Date();
        tipster.id = Guid.create().toString();
        tipster.ip_address = req.header('x-forwarded-for') || req.connection.remoteAddress;
        logtastic.save({message:"at the end of build up before file save", files: req.files}); 
        if(req.files) {
            tipster.savedFile = saveFile(req.files.tipFile, tipster.id);
        }
        logtastic.save({message:"at the end of file save"});
        tips.save(tipster, function (err, obj) {
            logtastic.save({message:"at the end of file save", error: err, savedObj: obj});
            if(err) {
                res.send(500, {error: 'something is wrong'});
            } else {
                res.redirect('http://taxpayers.org.nz/?success');
            }

        });
    } catch(failed) {
        logtastic.save({message:"in the catch", error: failed });
        res.send(200, failed);
    }
};