var db = require('../models');

exports.form = function(req, res) {
    res.render('admin/register', {title: 'Register'});
}

exports.submit = function(req, res, next) {
    var data = req.body.user; 
    db.User.getByName(data.name, function(err,user){
        if (err) return next(err);
        if (user) {
            res.error("Username already taken!");
            res.redirect('back');
        } else {
            var myUser = db.User.create({
                username: data.username,
                password: data.password
            }, function(err, user) {
                if (err) {
                    next(new Error(err))
                } else {
                    // we are good
                    req.session.username = user.username; 
                    res.redirect('/admin');
                }
            });
        }
    });
};

