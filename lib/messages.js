var express = require('express');
var res = express.response;

res.message = function(msg, session, type) {
    type = type || 'info';
    session.messages = session.messages || [];
    session.messages.push({type: type, 
                       string: msg});
};

res.error = function(msg, session) {
    return this.message(msg, session, 'error');
}

module.exports = function(req, res, next) {
    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = function(){
        req.session.messages = [];
    };
    next();
};