exports.success = function(req, res){
    var user = req.query.user;
    var result = req.query.result;
    var successDB = require('../lib/db')('failed');
    successDB.save({
        userId: user,
        result: result,
        created_on: new Date()
    }, function () {
            res.render('index', { title: 'Shopkeep', subtitle:'Keeping the shop open' });
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
        res.render('create_customer', { title: 'Shopkeep', subtitle:'Keeping the show' });
    });
    
};