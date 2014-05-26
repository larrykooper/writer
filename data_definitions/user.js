// this defines the Sequelize 'model'
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
        email: DataTypes.STRING
    });

    return User;
}