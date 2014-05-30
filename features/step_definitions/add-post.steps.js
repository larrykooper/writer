'use strict';

var db = require('../../models');
var should = require('chai').should()

module.exports = function() {

    this.World = require("../support/world.js").World; // overwrite default World constructor
    
    var myUser;
    var myPosting;
    
    this.Given(/^there is a User$/, function (done) {
        myUser = db.User.create({
            username: 'john',
            password: 'armadillo'
            });
        done();
    });

// In this next step definition, I passed the callback to Post.create
// in order to be sure that the create is done before going to the next step.
    this.Given(/^the User has posted the posting "([^"]*)"$/, function (arg1, callback) {
        myPosting = db.Post.create({
            title: "Test Post Title",
            body: arg1
        }, callback);
    });

    this.When(/^I visit the homepage$/, function (callback) {
        this.visit("http://localhost:3000/", callback);
    });

    this.Then(/^I should see "([^"]*)"$/, function (text, callback) {
        var posting = this.browser.text('.posting');
        //console.log(posting);
        posting.should.equal(text);
        callback();
    });

}