



//require('newrelic');
var raygun = require('raygun');
var raygunClient = new raygun.Client().init({ apiKey: 'DTUW+h7RxSN5Meopa7KKVg==' });
var logger = require('./lib/logger');
/*
process.on('uncaughtException', function(err) {
  raygunClient.send(err);
});
*/
 

var dstring = '2013-10-28T02:40:35.187Z';
var fromTZ= 'America/Los_Angles';
var toTZ = 'Pacifc/Auckland';

/*
var Scheduler = require('delayed-job');

var scheduler = Scheduler.createScheduler({
  backend: {
    name: 'redis',
    jobHoldingBay: 'myUniqueListKey'
  }
});

scheduler.on('job', function(job) {
    console.log('Received job', job);
});

var myJob = {
  title: 'Great Gig In The Sky'
};

scheduler.delay(myJob,15000);

 */


var express = require('express'),
    exphbs  = require('express3-handlebars'),
    routes = require('./routes'),
    complete = require('./routes/complete'),
    tips = require('./routes/tipline'),
    donation = require('./routes/donations'),
    details = require('./routes/details'),
    admin = require('./routes/admin.customers'),
    exports = require('./routes/exports'),
    http = require('http'),
    path = require('path'),
    app = express(),
    expstate = require('express-state'),
    inspect = function (obj) {
        var display = [];
        for (var prop in obj) {
            if( obj.hasOwnProperty( prop ) ) {
 
                display.push( prop + " = " + obj[prop] + "<br/>");
            }
        }
        return display.join('');
    },
    helpers = {
        inspect: function (obj) {
            var display = [];
            if (typeof obj == Array) {
                for (var i = 0; i < obj.length; i++) {
                    display.push(inspect(obj[i]));
                }
            } else {
                display.push(inspect(obj));
            }

            return display.join('');
        },
        total: function (collection) {
            var total =0;
            if (!collection) {
                console.log('no customers?');
                return '---';
            }
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].email.indexOf('the-kev') === -1) {
                    total++;
                }
            }
            return total;
        },
        header: function (collection) {
            var item = collection[0];
            var display = [];
            for (var prop in item) {
                if( item.hasOwnProperty( prop ) ) {
                    display.push('<th>' + prop + "</th>");
                }
            }
            return display.join('');
        },
        row: function (item, whitelist) {
            var display = [];
            for (var i = 0; i < whitelist.length; i++) {
                
                display.push("<td>" + item[whitelist[i]] + "</td>");
            }
            return display.join('');
        },
        money: function (item) {
            return '$' + item + '.00';
        },
        donationAmount: function (item) {
            return '$' + (item - 5) + '.00';
        },
        add: function (collection) {
            var display = [];
            var total = 0;
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].email.indexOf('the-kev') === -1) {
                    total = total+collection[i].amount;
                }
            }
            return total;
        },
        donationAdd: function (collection) {
            var display = [];
            var total = 0;
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].email.indexOf('the-kev') === -1) {
                    if (collection[i].donationAmount){
                        total = total + (collection[i].donationAmount); 
                    } else {
                       total = total + (collection[i].amount-5); 
                    }
                    
                }
            }
            return total;
        },
        ifNotTest: function (item, options) {
            if (item.email.indexOf('the-kev') === -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    };

expstate.extend(app);
var connect = require('connect'),
    connectDomain = require("connect-domain");
var auth = connect.basicAuth(function (user, pass) {
    return (user === 'admin' && pass === 'l0g1n2tusite');
});
app.configure(function(){
    app.set('port', process.env.PORT || 4567);
    app.set('views', __dirname + '/views');
    app.engine('handlebars', exphbs({defaultLayout: 'main', helpers:helpers}));
    app.set('view engine', 'handlebars');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    //app.use(raygunClient.expressHandler);
    //app.use(connectDomain())
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    //app.use(express.errorHandler());
    app.locals.pretty = true;
});

 
var corsStuff = function (req, res, next) {
/*
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    */
    next();
}
app.get('/', routes.index);
app.get('/customers', routes.customers);
app.post('/customers', routes.saveCustomer);
app.get('/donations', donation.donation);
app.post('/donations', donation.saveDonation);
app.get('/success', complete.success);
app.get('/fail', complete.fail);
//added to handle post
app.post('/success', complete.success);
app.post('/fail', complete.fail);
app.get('/tipline',corsStuff, tips.index);
app.post('/tipline',corsStuff, tips.saveTip);
app.get('/details',corsStuff, details.index);
app.post('/details',corsStuff, details.update);
app.get('/stop-payments',corsStuff, details.cancel);

app.get('/err', function (req, res) {
    throw "fall down, go boom";
});
app.get('/failtest', function (req, res) {
    throw "fall down, go boom";
});
app.get('/timeout', function (req, res) {
     
});
app.get('/admin/customers', auth, admin.index);
app.get('/admin/donors', auth, admin.donors);
app.get('/admin/shopify/customers/:id', auth, admin.shopify);
app.get('/admin/recurringcustomers', auth, admin.recurringCustomers);
app.get('/admin/xero/customers/:id', auth, admin.xero);
app.get('/admin/full/xero/customers/:id', auth, admin.xeroFull);
app.get('/admin/xero/recurringcustomers/:id', auth, admin.xeroRecurring);
app.get('/admin/xero/donors/:id', auth, admin.xeroDonor);
app.get('/admin/xero/donors/invoice/:id', auth, admin.xeroDonorInvoice);
app.get('/admin/export/customers',auth, exports.index);

//app.use(function(err, req, res, next) {
    //raygunClient.send(err);
    //res.redirect('http://taxpayers.org.nz/');
//});
app.get('/admin/xero/invoice/:id', auth, admin.xeroInvoice);
app.get('/admin/xero/d/invoice/:id', auth, admin.xeroDonation);
app.get('/admin/xero/import/customers/', auth, admin.pumpCustomers);
app.get('/admin/xero/import/invoices/', auth, admin.pumpCustomersInvoices);
app.get('/rebillsuccess', function(req, res) {
    console.log('rebill')
})
 
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') +" mode");
});

