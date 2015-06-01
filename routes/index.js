var db = require('../models');

exports.index = function(req, res){
  db.Post.findAll({order: '"createdAt" DESC'}).then(function(posts) {
    res.render('index', {
      title: 'Writer',
      posts: posts
    }) // end res.render
  }).catch(console.log.bind(console)); // end then() function
} // end exports.index
