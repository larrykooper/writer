var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var userMiddleware = require('./lib/middleware/user');
var messages = require('./lib/messages');

// Now we require the route logic
var routes = require('./routes/index');
var adminRoutes = require('./routes/admin');
var loginRoutes = require('./routes/login');
var register = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('models', require('./models'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'fjfwienvnwinviw', key: 'sid'  }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(userMiddleware);
app.use(messages);

// Routes are here
app.get('/', routes.index);
app.get('/admin', adminRoutes.index);
app.get('/admin/posts', adminRoutes.posts);
app.get('/admin/editor', adminRoutes.editor);
app.post('/login', loginRoutes.submit);
app.get('/logout', loginRoutes.logout);
app.get('/admin/register', register.form);
app.post('/admin/register', register.submit);

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