var db = require('../../models');

module.exports = function(req, res, next) {
    // Check the session for the logged-in username
    var username = req.session.username;
    if (!username) return next(); 

    // Get logged-in user's data from database
    db.User
        .find({ where: {username: username} })
        .complete(function(err, user) {
            if (err) {
                console.log('Error 203: An error occurred while searching for user:', err)
                return next(err);
            } else if (!user) {
                console.log('Error 205: No user with the username has been found.')
            } else {
                console.log('Hello ' + user.username + '!');
                // We store the user info in the request object (req)
                // res.locals is the request-level object that
                //   Express provides to expose data to templates.
                // res is the response object.
                req.user = user;
                res.locals.user = user;
                next();
            }
        })
};