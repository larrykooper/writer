// models/user.js

var db = require('../data_definitions');

exports.create = function(userData) {
    var user = db.User.build({
         username: userData.username
    });
}

