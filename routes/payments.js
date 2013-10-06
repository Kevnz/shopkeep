exports.index = function(req, res){
 
};
exports.paymentsDue = function(req, res){
    //endpoint for pulling customers with recurring charge due today;
    var paymentDB =  require('../lib/db')('payment_schedule');
    
    
};

exports.saveCustomer = function (req, res) {

};