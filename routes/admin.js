exports.index = function(req, res){
    res.render('admin/index', {
      title: 'Writer Admin'
    })
}

exports.posts = function(req, res) {
    if (res.locals.user) {
        res.render('admin/posts');
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