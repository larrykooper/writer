var zombie = require('zombie');
var db = require('../../models');

// clear out test database
db.Post.deleteAll();
db.User.deleteAll();

var World = function World(callback) {
    this.browser = new zombie(); // this.browser will be available in step definitions

    this.visit = function(url, callback) {
        this.browser.visit(url, callback);
    };

    this.login = function(callback) {
        //console.log("I AM LOGGING IN");
        var myUser;
        myUser = db.User.create({
            username: "mary",
            password: "catdog"
        }, callback);
        var context = this;
        this.visit("http://localhost:3000/admin", function(){
            context.browser.fill(".email", myUser.username).fill(".password", myUser.password);
            context.browser.pressButton("Login", function() {
            });
        });
    };

    callback(); // tell Cucumber we're finished and to use 'this' as the world instance
};
exports.World = World;