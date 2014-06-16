var db = require('../models');

exports.index = function(req, res){
  db.Post.findAll({order: '"createdAt" DESC'}).success(function(posts) {
    res.render('index', {
      title: 'Writer',
      posts: posts
    })
  })
}
