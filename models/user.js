module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            create: function(userData) {
                var user = User.build({
                    username: userData.username
                });
               // did not save yet
            },

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
            }
        },
        instanceMethods: {
            authenticate: function(username, password, callback) {
                // Look up user by name
                User.getByName(username, function(err, user) {
                    if (err) return callback(err); // the callback with error
                    if (!user) return callback(err); // User does not exist; invoke the callback
                    // Hash the given password
                    bcrypt.hash(user.password, user.salt, function(err, hash) {
                        if (err) return callback(err);
                        if (hash == user.password) return fn(null, user);  // match found
                        callback(); // invalid password
                    });
                });
            }
        }   // instanceMethods
    });
    return User;
} // function(sequelize