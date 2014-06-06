var should = require('chai').should();

module.exports = function() {

    this.World = require("../support/world.js").World; // overwrite default World constructor

    this.Given(/^I am a logged\-in user$/, function (callback) {
      this.login();
      callback();
    });    
    
    // is it possible that if you are already on the page you cannot visit it?
    
    var wrapper = this;
    this.Given(/^I press the button with id "([^"]*)"$/, function (buttonId, callback) {
        console.log("MESSAGE 112");
        var context = this;
        this.visit("http://localhost:3000/admin/posts", function(){
            console.log("MESSAGE 161");
            console.log(this.browser.html());
            var selector = '#' + buttonId; 
            context.browser.pressButton(selector, function(){
                //context.browser.dump();
                wrapper.Then(/^I should be on the editor page$/, function (callback) {
                    console.log("MESSAGE 151");
                    var location = this.browser.location.pathname;
                    location.should.equal('/admin/mmixerpx');
                    callback();
                });
            });
        });
    });
    
    
    this.Then(/^I should be on the editor page$/, function (callback) {
        console.log("MESSAGE 301");
        var location = this.browser.location.pathname;
        location.should.equal('/admin/mmixerpx');
        callback();
    });


}