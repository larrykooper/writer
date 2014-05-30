var bcrypt = require('bcrypt');

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
                    username: userData.username,
                    password: userData.password
                });
                // Hash the password
                user.hashPassword(function(err) {
                    if (err) return callback(err);
                    // save the user record
                    user.save(callback)
                        .success(function(){
                            callback(null, user);
                        }).error(function(error){
                            callback('ERROR 613: Creating a user: ' + error);
                        })
                }); // hashPassword
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
                    bcrypt.hash(password, user.salt, function(err, hash) {
                        if (err) return callback(err);
                        if (hash == user.password) {
                            return callback(null, user);  // match found
                        }
                        callback(); // invalid password
                    });
                });
            },

            hashPassword: function(fn) {
                var user = this;
                // Generate a 12-character salt
                bcrypt.genSalt(12, function(err,salt) {
                    if (err) return fn(err);
                    // Set salt to save it
                    user.salt = salt;
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        if (err) return fn(err);
                        // Replace plain text password with hash
                        user.password = hash;
                        fn();
                    });
                });
            }
        }   // instanceMethods
    });   // define
    return User;
} // function(sequelize