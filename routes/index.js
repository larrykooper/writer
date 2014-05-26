var db = require('../data_definitions');

exports.index = function(req, res){
  db.Post.findAll().success(function(posts) {
    res.render('index', {
      title: 'Writer',
      posts: posts
    })
  })
}
