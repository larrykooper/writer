var db = require('../models');

exports.index = function(req, res){
    res.render('admin/index', {
      title: 'Writer Admin'
    })
}

exports.posts = function(req, res) {
    if (res.locals.user) {
        db.Post.findAll({order: '"createdAt" DESC'}).success(function(posts) {
            res.render('admin/posts', {
                posts: posts
            });
        })
    } else {
        res.redirect('/admin');
    }
}

exports.editor = function(req, res) {
    if (res.locals.user) {
        if (req.params.id) {  // if there is a post number
            // find the post
            db.Post.find(req.params.id).success(function(post) {
                res.render('admin/editor', {
                    post: post,
                    newPost: false
                });
            });
        } else { // We are creating a new post
            var thePost = {title: "", body: ""}
            res.render('admin/editor', {
                post: thePost,
                newPost: true
            });
        }
    } else {  // not logged in
        res.redirect('/admin');
    }
}

exports.register = function(req, res) {
    res.render('admin/register', {title: 'Register'});
}

exports.create = function(req, res) {
    var data = req.body.post;
    var myPost = db.Post.create({
        title: data.title,
        body: data.body
    }, function(err, post) {
        if (err) {
            next(new Error(err))
        } else {
            // we are good
            res.redirect('/admin/posts');
        }
    });
}

exports.deletePost = function(req, res) {
    db.Post.deleteOne(req.params.id, function(err) {
        if (err) {
            next(new Error(err))
        } else {
            // Return JSON that gives post we just deleted
            res.json({post: req.params.id});
        }
    });
}

exports.update = function(req, res) {
    if (res.locals.user) {
        var data = req.body.post;
        db.Post.find(req.params.id).success(function(post) {
            post.updateAttributes(
                data
            );
            res.redirect('/admin/posts');
        });
    } else {  // not logged in
        res.redirect('/admin');
    }
}
