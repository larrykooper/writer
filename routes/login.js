var db = require('../models');

function storeauth(err, req, res, user) {
    // Returns user here if user is authenticated
    // Delegate errors
    if (err) {
        console.error(err);
    };
    if (user) {
        // Store user ID in session
        req.session.uid = user.id;
        res.redirect('admin/posts');
    } else {
        res.error("Your username or password is incorrect");
        res.redirect('back');
    }
}

exports.submit = function(req, res, next) {
    var user = db.User.build({
        username: req.body.username,
        password: req.body.password
    });

    user.authenticate(user.username, user.password, storeauth);

}