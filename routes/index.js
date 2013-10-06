exports.index = function(req, res){
  res.render('index', { title: 'Shopkeep', subtitle:'Keeping the show' });
};

exports.saveCustomer = function (req, res) {
    var customers =  require('../lib/db')('customer');
    var cards =  require('../lib/db')('cc_details');
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var created_on = Date.now();
    customers.save({})
};