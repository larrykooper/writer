var zombie = require('zombie');
var db = require('../../models');
var util = require('./util');
var fs = require('fs');
var path = require('path');

// clear out test database
db.Post.deleteAll();
// Not deleting users so I can keep a test user
//db.User.deleteAll();

var World = function World(callback) {
    this.browser = new zombie(); // this.browser will be available in step definitions

    this.visit = function(url, callback) {
        this.browser.visit(url, callback);
    };

    this.helpers = {
        browser: this.browser
    };

    load(path.join(__dirname, './helpers'), this.helpers);

    callback(); // tell Cucumber we're finished and to use 'this' as the world instance
};

function load(helperPath, dest) {
    var files = fs.readdirSync(helperPath),
    modulePath;

    for (var i = 0; i < files.length; i++) {
        if (files[i].match(/\.swp$/)) {
            continue;
        }
        modulePath = path.join(helperPath, files[i]);
        util.mixin(require(modulePath), dest);;
    }
}

exports.World = World;