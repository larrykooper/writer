// models/user.js

//var db = require('../data_definitions');
var app = require('../app');
var User = app.get('dataDefinitions').User;

exports.create = function(userData) {
    var user = User.build({
         username: userData.username
    });
}

