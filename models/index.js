if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize');
    var sequelize = null;
    var match;

    if (process.env.NODE_ENV == 'test') {

        match = process.env.TEST_DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

        sequelize_test = new Sequelize(match[5], match[1], match[2], {
            dialect:  'postgres',
            protocol: 'postgres',
            port:     match[4],
            host:     match[3],
            logging:  console.log
        });
        console.log("Welcome to the test system!");
        global.db = {
            Sequelize: Sequelize,
            sequelize: sequelize_test
        }
    } else {
        match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

        sequelize = new Sequelize(match[5], match[1], match[2], {
            dialect:  'postgres',
            protocol: 'postgres',
            port:     match[4],
            host:     match[3],
            logging:  console.log
        });

        console.log("Welcome to the dev system!");
        global.db = {
            Sequelize: Sequelize,
            sequelize: sequelize
        }
    }

    global.db.User = global.db.sequelize.import(__dirname + '/user');
    global.db.Post = global.db.sequelize.import(__dirname + '/post');

}
module.exports = global.db