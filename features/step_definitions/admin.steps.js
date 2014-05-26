//var assert = require('assert');
var should = require('chai').should()

module.exports = function() {

    this.World = require("../support/world.js").World; // overwrite default World constructor

    this.Given(/^I visit the admin page$/, function (callback) {
        this.visit("http://localhost:3000/admin", callback);
    });
    
    this.Then(/^I should see the title "([^"]*)"$/, function (arg1, callback) {
        var actualTitle = this.browser.text('h1');
        actualTitle.should.equal(arg1);
        callback();
    });

    this.Then(/^I should see the login form$/, function (callback) {
        var labels = this.browser.text('label');
        labels.should.contain('Password');
        callback();
    });


}