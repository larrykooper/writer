// models/post.js

var app = require('../app');
var Post = app.get('dataDefinitions').Post

exports.create = function(postData) {
    var post = Post.build({
         title: postData.title,
         body: postData.body
    });
}
