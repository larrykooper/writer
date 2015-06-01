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
                    .then(function(){
                        callback();
                    }).error(function(error){
                        callback('ERROR 607: ' + error);
                    })
                },

            deleteAll: function() {
                Post.destroy();
            },
            deleteOne: function(postID, callback) {
                Post.find(postID).then(function(post){
                    post.destroy().then(function(){
                        callback();
                    });
                });
            } // delete

        } // classMethods
    }); // define

  return Post;
}
