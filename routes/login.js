var db = require('../models');
var express = require('express');
var res = express.response;

exports.submit = function(req, res, next) {
    var session = req.session;
    var user = db.User.build({
        username: req.body.username,
        password: req.body.password
    });

    user.authenticate(user.username, user.password, session, function(err, session, user){
        // Returns user here if user is authenticated
        // Delegate errors
        if (err) {
            console.error(err);
        };
        if (user) {
            // Store user ID in session
            session.uid = user.id;
            res.redirect('admin/posts');
        } else {
            res.error("Your username or password is incorrect", session);
            res.redirect('/admin');
        }
    });

}