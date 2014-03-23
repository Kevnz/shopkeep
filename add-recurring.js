var customersDB = require('./lib/db')('customer');
var recurringDB = require('./lib/db')('recurring');

var all = ['jordan.williams@franksogilvie.co.nz',
'bobmcmillan@xtra.co.nz',
'plumridg@actrix.co.nz',
'nickinauckland@gmail.com',
'andrewnriches@gmail.com',
'vaughan@vdav.net',
'123test@the-kev.com'];

var febsters = ['garyjwestwood@gmail.com', 'brian@cartmell.co.nz']

all.forEach(function allForeachLoop(email) {
	customersDB.findOne({email:email}, function allFind (err, customer) {
		var records = [{
			email:customer.email,
			month: 'December',
			amount: customer.donationAmount || (customer.amount-5)
		},
		{
			email:customer.email,
			month: 'January',
			amount: customer.donationAmount || (customer.amount-5)
		},
		{
			email:customer.email,
			month: 'Febuary',
			amount: customer.donationAmount || (customer.amount-5)
		},
		{
			email:customer.email,
			month: 'March',
			amount: customer.donationAmount || (customer.amount-5)
		}];
		//console.log(records);
		records.forEach(function allForEach (record){
			console.log(record);
			recurringDB.save(record, function allRecordInsert(err, doc) {console.log(err);console.log(doc)});
		});
		
	});
});
febsters.forEach(function(email) {
	//console.log('febsters');
	customersDB.findOne({email:email}, function febstersFind (err, customer) {
		var records = [
		{
			email:customer.email,
			month: 'March',
			amount: customer.donationAmount || (customer.amount-5)
		}];
		//console.log(records);
		records.forEach(function febstersForEach (record){
			console.log(record);
			recurringDB.save(record, function febsterRecordInsert (err, doc) {console.log(err);console.log(doc)});
		});
	});
});