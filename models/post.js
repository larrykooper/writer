module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define('post', {
        title: DataTypes.TEXT,
        body: DataTypes.TEXT,
        status: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        classMethods: {
            create: function(postData, callback) {
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
                },

            deleteAll: function() {
                Post.destroy();
            }
        } // classMethods
    }); // define

  return Post;
}
