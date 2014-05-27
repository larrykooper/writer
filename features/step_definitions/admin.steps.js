var User = require(process.cwd() + '/models/user');
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

    this.Given(/^a user with username "([^"]*)" and password "([^"]*)"$/, function (user, password, callback) {
        var myUser;
        myUser = User.create({
            username: user,
            password: password
        });
        callback();
    });

    this.When(/^I login as "([^"]*)" with password "([^"]*)"$/, function (user, password, callback) {
        // express the regexp above with the code you wish you had
        var context = this;
        this.visit("http://localhost:3000/admin", function(){
            context.browser.fill(".email", user).fill(".password", password);
            context.browser.pressButton("Login", function() {
                // All signed up, now what?
                callback();
            });
        });

    });


}