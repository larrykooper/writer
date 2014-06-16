var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var userMiddleware = require('./lib/middleware/user');
var messages = require('./lib/messages');
var moment = require('moment');

// Now we require the route logic
var slashRoute = require('./routes/index');
var loginRoutes = require('./routes/login');
var register = require('./routes/register');
var adminRoutes = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('models', require('./models'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'fjfwienvnwinviw', key: 'sid'  }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(userMiddleware);
app.use(messages);

app.locals.date = function(date) {
  return moment(date).format('MMM DD YYYY');
}

// Routes are here
app.get('/', slashRoute.index);
app.post('/login', loginRoutes.submit);
app.get('/logout', loginRoutes.logout);
app.post('/admin/register', register.submit);
app.post('/admin/post', adminRoutes.create);
app.delete('/admin/posts/:id', adminRoutes.deletePost);

// Routes with only a controller

app.all(/^\/([^\/]+)$/, function(req, res) {
    //require for a module with a dynamic name based on path info
    var controller = require('./routes/' + req.params[0] + '.js');
    //build a method name
    var fname = 'index';
    //if a exported method exists on the module, then use it, otherwise, create a new function
    var func = controller[fname] || function () {
        //maybe use a 404
        res.send('controller/method not found: ' + fname);
    };
    //invoke the function
    func.call(this, req, res);
});

// Routes with a controller and an action

app.all(/^(.+)\/(.+)/, function(req, res) {
    //require for a module with a dynamic name based on path info
    var controller = require('./routes/' + req.params[0] + '.js');
    //build a method name
    var fname = (req.params[1] || 'index');
    //if a exported method exists on the module, then use it, otherwise, create a new function
    var func = controller[fname] || function () {
        //maybe use a 404
        res.send('controller/method not found: ' + fname);
    };
    //invoke the function
    func.call(this, req, res);
});

/// catch 404 and forwarding to error handler
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
        console.log(err.message);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;