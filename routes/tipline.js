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

    
    var saveFile = function saveFileFromPost (file, id, callback) {
        try {

            var blobService = azure.createBlobService();
            var containerName = 'taxpayers-tipline';
            blobService.createContainerIfNotExists(containerName
                , {publicAccessLevel : 'blob'}
                , function(error){
                    if(!error){
                        // Container exists and is public
                    }
                });

            var data = fs.readFileSync(file.path);
            var newPath = __dirname + "/uploads/" + id + '-' + file.name ;
            var fileName = id + '-' + file.name;
            logtastic.save({message:"gonna write to " + newPath});
            //fs.writeFileSync(newPath, data);



            blobService.createBlockBlobFromFile(containerName
            , fileName
            , file.path
            , function(error){
                 logtastic.save({message:"blob callback", error: error});
                if(!error){
                    callback(fileName);
                }
            });
        }
        catch(fail) {
            logtastic.save({message:"blob failed to save - this stinks ", error: fail}, function (){
                 callback('nothing');
            });
           
        }
    }

    try {
        var Guid = require('guid');

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
            saveFile(req.files.tipFile, tipster.id, function (filename) {
                tipster.savedFile = filename
                logtastic.save({message:"at the end of file save"});
                    tips.save(tipster, function (err, obj) {
                    logtastic.save({message:"at the end of file save", error: err, savedObj: obj});
                    if(err) {
                        res.send(500, {error: 'something is wrong'});
                    } else {
                        res.send(200);
                    }

                });
            });
        }
        else {
            tips.save(tipster, function (err, obj) {
            logtastic.save({message:"at the end of file save", error: err, savedObj: obj});
            if(err) {
                res.send(500, {error: 'something is wrong'});
            } else {
                res.send(200);
            }

        });
        }


    } catch(failed) {
        logtastic.save({message:"in the catch", error: failed });
        res.send(200, failed);
    }
};