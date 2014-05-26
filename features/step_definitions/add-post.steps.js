'use strict';

var user = require(process.cwd() + '/models/user');
var post = require(process.cwd() + '/models/post');

module.exports = function() {

    this.World = require("../support/world.js").World; // overwrite default World constructor
    
    var myUser;
    var myPosting;
    
    this.Given(/^there is a User$/, function (done) {
        myUser = user.create({username: 'john'});
        done();
    });

    this.Given(/^the User has posted the posting "([^"]*)"$/, function (arg1, done) {
        myPosting = post.create({
            title: "Test Post Title",
            body: arg1
        })
        done();
    });

    this.When(/^I visit the homepage$/, function (callback) {
        // express the regexp above with the code you wish you had
        this.visit("http://localhost:3000/", callback);

    });

}
