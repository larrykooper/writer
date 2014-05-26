var zombie = require('zombie');
// clear out test database
var Post = require(process.cwd() + '/models/post');
Post.deleteAll();

var World = function World(callback) {
  this.browser = new zombie(); // this.browser will be available in step definitions

  this.visit = function(url, callback) {
    this.browser.visit(url, callback);
  };

  callback(); // tell Cucumber we're finished and to use 'this' as the world instance
};
exports.World = World;