'use strict';

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import subdomain from 'express-subdomain';
import routes from './routes/index';
import users from './routes/users';
import productApi from './routes/api/products';
import cartAPI from './routes/api/cart';
import passport from 'passport';
import { OAuth2Strategy }  from 'passport-google-oauth';
import xtconf from 'xtconf';
import session from 'express-session';
import processor from './auth/processor';
import { get, put, del, post } from './resources/users';
import { routeListing } from './utils/routes';
import MongoSession from 'express-mongo-session';
import GoogleAnalytics from 'ga';

let conf = xtconf();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
passport.use(new OAuth2Strategy({
    clientID: conf.get('google-key'),
    clientSecret: conf.get('google-secret'),
    callbackURL: 'http://localhost:4567/auth/google/return'
  }, processor));
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('query parser', 'extended');
app.use(favicon(__dirname + '/public/favicons/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoSession()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//routeListing(routes.stack, '');
app.use('/users', users);
//routeListing(users.stack, '/users');
app.use('/api/products', productApi);
//routeListing(productApi.stack, '/api/products');
app.use('/api/cart', cartAPI);
//routeListing(cartAPI.stack, '/api/cart');
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile'] }));

app.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));
console.log('routes loaded');
routeListing(app._router.stack, '');

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        var ua = conf.get('ga');
        var host = 'shopkeep.herokuapp.com';
        var ga = new GoogleAnalytics(ua, host);
        ga.trackPage(req.path);
        ga.trackEvent({
            category: 'Errors',
            action: 'Errors',
            label: err.message,
            value: err
        });
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        next();
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
    next();
});

//console.log(app);

export default app;
