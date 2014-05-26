if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize');
    var sequelize = null;
    var match;

    if (process.env.NODE_ENV == 'test') {
        console.log('IT IS TEST');

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

        console.log("IT IS NOT TEST");
        global.db = {
            Sequelize: Sequelize,
            sequelize: sequelize
        }
    }

    global.db.User = global.db.sequelize.import(__dirname + '/user');
    global.db.Post = global.db.sequelize.import(__dirname + '/post');

}
module.exports = global.db