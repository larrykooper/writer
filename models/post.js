module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define('post', {
        title: DataTypes.TEXT,
        body: DataTypes.TEXT,
        status: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        classMethods: {
            create: function(postData, callback) {
                var saveBody = postData.body.replace(/(?:\r\n|\r|\n)/g, '<br />');
                var post = Post.build({
                     title: postData.title,
                     body: saveBody
                });

                post.save(callback)
                    .success(function(){
                        callback();
                    }).error(function(error){
                        callback('ERROR 607: ' + error);
                    })
                },

            deleteAll: function() {
                Post.destroy();
            }
        } // classMethods
    }); // define

  return Post;
}
