// models/post.js

var app = require('../app');
var Post = app.get('dataDefinitions').Post

exports.create = function(postData, callback) {
    var post = Post.build({
         title: postData.title,
         body: postData.body
    });

    post.save(callback)
        .success(function(){
            callback();
        }).error(function(error){
            callback('oops, do some error handling' + error);
        })
};

exports.deleteAll = function() {
    Post.destroy();
};