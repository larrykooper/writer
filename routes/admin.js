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
        res.render('admin/editor');
    } else {
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
            res.redirect('/admin');
        }
    });
}

exports.deletePost = function(req, res) {
    db.Post.deleteOne(req.params.id, function(err) {
        if (err) {
            next(new Error(err))
        }
    });
}
