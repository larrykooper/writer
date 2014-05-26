'use strict';
global.env = 'test';
var user = require(process.cwd() + '/models/user');
module.exports = function() {
    
    var myUser;
    
    this.Given(/^there is a User$/, function (done) {
        myUser = user.create({username: 'john'});
        done();
    });

    this.Given(/^the User has posted the posting "([^"]*)"$/, function (arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

}
