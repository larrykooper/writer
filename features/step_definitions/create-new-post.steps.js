var should = require('chai').should();

module.exports = function() {

    this.World = require("../support/world.js").World; // overwrite default World constructor

    this.Given(/^I am a logged\-in user$/, function (callback) {
      this.login();
      callback();
    });    
    
    this.Given(/^I am on the admin posts page$/, function (callback) {
      this.visit("http://localhost:3000/admin/posts", callback);
      callback();
    });
    
    this.Given(/^I press the button with id "([^"]*)"$/, function (buttonId, callback) {
        this.visit("http://localhost:3000/admin/posts", function(){
            console.log("BROWSER");
            console.log(this.browser.html());
            var selector = '#' + buttonId; 
            this.browser.pressButton(selector, function(){
                callback();
            });
        });
    });
    
    this.Then(/^I should be on the editor page$/, function (callback) {
        var location = this.browser.location.pathname;
        location.should.equal('/admin/editor');
        callback();
    });

}