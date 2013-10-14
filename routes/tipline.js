exports.index = function(req, res){
  res.render('tipline', { title: 'Taxpayers Union', subtitle:'' });
};

var qconf = require('qconf'),
    config = qconf();
var saveFile = function saveFileFromPost (file, id) {
 
    var data = fs.readFileSync(file.path);
    var newPath = __dirname + "/uploads/" + id + '-' + file.name ;
    fs.writeFileSync(newPath, data);
    return newPath;
}
exports.saveTip = function (req, res) {
    try {
        var Guid = require('guid');
        var db = require('../lib/db')('tips');
        var tips =  require('../lib/db')('tips');
        console.log(customers);

        var tipster = {};
        tipster.name = req.body.name;
        tipster.phone_number = req.body.phone_number;
        tipster.message = req.body.message;
        tipster.created_on = new Date();
        tipster.id = Guid.create().toString();
        tipster.ip_address = req.header('x-forwarded-for') || req.connection.remoteAddress;
        if(req.files) {
            tipster.savedFile = saveFile(req.files.tipFile, tipster.id);
        }
        
        tips.save(tipster, function (err, obj) {
            if(err) {
                res.send(500, {error: 'something is wrong'});
            } else {
                res.redirect('http://taxpayers.org.nz/?success');
            }

        });
    } catch(failed) {
        res.send(200, failed);
    }
};