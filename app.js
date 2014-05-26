var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Now we require the route logic
var routes = require('./routes/index');
var adminRoutes = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('dataDefinitions', require('./data_definitions'));

app.use(express.static(path.join(__dirname, 'public')));

// Routes are here
app.get('/', routes.index);
app.get('/admin', adminRoutes.index);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

module.exports = app;