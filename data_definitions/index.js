if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize');
    var sequelize = null;
    var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

    sequelize = new Sequelize(match[5], match[1], match[2], {
            dialect:  'postgres',
            protocol: 'postgres',
            port:     match[4],
            host:     match[3],
            logging:  console.log
        });

    if (global.env == 'test') {

        match = process.env.TEST_DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

        sequelize_test = new Sequelize(match[5], match[1], match[2], {
            dialect:  'postgres',
            protocol: 'postgres',
            port:     match[4],
            host:     match[3],
            logging:  console.log
        });

        global.db = {
            Sequelize: Sequelize,
            sequelize: sequelize_test,
            User:      sequelize.import(__dirname + '/user')
        }
    } else {
        global.db = {
            Sequelize: Sequelize,
            sequelize: sequelize,
            User:      sequelize.import(__dirname + '/user')
        }
    }

}
module.exports = global.db