var raygun = require('raygun');
var raygunClient = new raygun.Client().init({ apiKey: 'DTUW+h7RxSN5Meopa7KKVg==' });


var express = require('express'),
    exphbs  = require('express3-handlebars'),
    routes = require('./routes'),
    complete = require('./routes/complete'),
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
    app.use(raygunClient.expressHandler);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.get('/', routes.index);
app.get('/customers', routes.customers);
app.post('/customers', routes.saveCustomer);
app.get('/success', complete.success);
app.get('/fail', complete.fail);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') +" mode");
});

