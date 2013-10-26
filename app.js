require('newrelic');
var raygun = require('raygun');
var raygunClient = new raygun.Client().init({ apiKey: 'DTUW+h7RxSN5Meopa7KKVg==' });


var express = require('express'),
    exphbs  = require('express3-handlebars'),
    routes = require('./routes'),
    complete = require('./routes/complete'),
    tips = require('./routes/tipline'),
    donation = require('./routes/donations'),
    details = require('./routes/details'),
    http = require('http'),
    path = require('path'),
    app = express(),
    expstate = require('express-state');

expstate.extend(app);

app.configure(function(){
    app.set('port', process.env.PORT || 4567);
    app.set('views', __dirname + '/views');
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(raygunClient.expressHandler);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
    app.locals.pretty = true;
});
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.get('/', routes.index);
app.get('/customers', routes.customers);
app.post('/customers', routes.saveCustomer);
app.get('/donations', donation.donation);
app.post('/donations', donation.saveDonation);
app.get('/success', complete.success);
app.get('/fail', complete.fail);
app.get('/tipline', tips.index);
app.post('/tipline', tips.saveTip);
app.get('/details', details.index);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') +" mode");
});

