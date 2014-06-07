var should = require('chai').should();

var createNewPostSteps = function() {

    this.World = require("../support/world.js").World; // overwrite default World constructor

   this.Given(/^I am not signed in$/, function(callback) {
        this.helpers.visit('admin', callback);
    });
    this.Given(/^I sign in$/, function(callback) {
        this.helpers.signIn("john", "test", callback);
    });

    this.Given(/^I press the button with id "([^"]*)"$/, function (buttonID, callback) {
        this.helpers.pressButton(buttonID, callback);
    });

    this.Then(/^I should be on the editor page$/, function (callback) {
        this.helpers.urlShouldContain("editor");
        callback();
    });

};

module.exports = createNewPostSteps;