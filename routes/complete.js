exports.success = function(req, res){
    var user = req.query.user;
    var result = req.query.result;
    var successDB = require('../lib/db')('success');
    successDB.save({
        userId: user,
        result: result,
        created_on: new Date()
    }, function () {
            res.redirect('http://taxpayers.org.nz/donation-success') ;
    });

};
exports.fail = function(req, res){
    var user = req.query.user;
    var result = req.query.result;
    var failedDB = require('../lib/db')('failed');
    failedDB.save({
        userId: user,
        result: result,
        created_on: new Date()
    }, function (){
        res.redirect('http://taxpayers.org.nz/donation-fail')
    });
    
};