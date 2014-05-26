'use strict';

var User = require(process.cwd() + '/models/user');
var Post = require(process.cwd() + '/models/post');
var assert = require('assert');

module.exports = function() {

    this.World = require("../support/world.js").World; // overwrite default World constructor
    
    var myUser;
    var myPosting;
    
    this.Given(/^there is a User$/, function (done) {
        myUser = User.create({username: 'john'});
        done();
    });

    this.Given(/^the User has posted the posting "([^"]*)"$/, function (arg1, callback) {
        myPosting = Post.create({
            title: "Test Post Title",
            body: arg1
        }, callback);
    });

    this.When(/^I visit the homepage$/, function (callback) {
        this.visit("http://localhost:3000/", callback);
    });

    this.Then(/^I should see "([^"]*)"$/, function (text, callback) {
        var posting = this.browser.text('.posting');
        console.log(posting);
        assert.equal(posting, text, "Expected posting: " + posting + " to equal text: " + text);
        callback();
    });

}