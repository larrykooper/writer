exports.index = function(req, res){
  
    res.render('admin/index', {
      title: 'Writer Admin'
      
    })
  
}

exports.posts = function(req,res) {
    res.render('admin/posts');
}