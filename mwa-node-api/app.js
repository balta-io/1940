var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var auth = require('./security/auth');

mongoose.connect(config.db);

var userController = require('./controllers/user-controller');
var accountController = require('./controllers/account-controller');
var productController = require('./controllers/product-controller');

var app = express();

//CORS middleware
var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');

    next();
};

app.use(logger('dev'));
app.use(allowCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.post('/api/users', userController.create);
app.post('/api/account/authenticate', accountController.authenticate);
app.get('/api/account/info', auth.authorize, accountController.info);
app.get('/api/products', productController.list);
app.get('/api/products/:id', productController.show);
app.post('/api/products', auth.authorize, productController.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
