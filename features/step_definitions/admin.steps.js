var assert = require('assert');

module.exports = function() {

    this.World = require("../support/world.js").World; // overwrite default World constructor

    this.Given(/^I visit the admin page$/, function (callback) {
        this.visit("http://localhost:3000/admin", callback);
    });
    
    this.Then(/^I should see the title "([^"]*)"$/, function (arg1, callback) {
        var actualTitle = this.browser.text('h1');
        assert.equal(actualTitle, arg1, "Expected: " + arg1 + " actual: " + actualTitle);
        callback();
    });


}