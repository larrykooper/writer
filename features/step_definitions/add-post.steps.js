'use strict';
var user = require(process.cwd() + '/models/user');
module.exports = function() {
    
    var myUser;
    
    this.Given(/^there is a User$/, function (done) {
        myUser = user.create({username: 'john'});
        // express the regexp above with the code you wish you had
        done();
    });
}
