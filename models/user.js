module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            create: function(userData, callback) {
                var user = User.build({
                    username: userData.username
                });
               // save
               user.save(callback)
                   .success(function(){
                       callback();
                   }).error(function(error){
                       callback('ERROR 613: ' + error);
                   })
            }, // end of create

            deleteAll: function() {
                User.destroy();
            },

            getByName: function(name, fn) {
                // Looks up the User by name
                User.find({ where: {username: name} }).done(function(err, user) {
                    if (err) {
                        return fn(err);
                    }
                    return fn(null, user);
                });
            } // end of getByName
        }, // end of classMethods
        instanceMethods: {
            authenticate: function(username, password, callback) {
                // Look up user by name
                User.getByName(username, function(err, user) {
                    if (err) return callback(err); // the callback with error
                    if (!user) return callback(null); // User does not exist; invoke the callback
                    // Hash the given password
                    bcrypt.hash(user.password, user.salt, function(err, hash) {
                        if (err) return callback(err);
                        if (hash == user.password) return fn(null, user);  // match found
                        callback(); // invalid password
                    });
                });
            }
        }   // instanceMethods
    });   // define
    return User;
} // function(sequelize