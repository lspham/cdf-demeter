var config = {
    RESTful: {
        server:'http://demeter.dev/api/',
        version: 'v1',
        resources: {
            data: 'data'
        }
    },

    mysql: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'demeter'
    },

    logs: {
        dir: 'logs/',
        info: 'demeter.socket.info.log',
        error: 'demeter.socket.error.log'
    }
};

if (process.argv.indexOf('production') !== -1) {
    config.mysql = {
        host: 'localhost',
        user: 'demeter',
        password: 'raGbmmqSbyQC8X3L',
        database: 'demeter'
    }

    config.logs = {
        dir: '/home/demeter/logs/'
    }
}

module.exports = config;