var mysql = require('mysql'),
    config = require('./config');

var model = {
    connection: null,
    logger: null,
    testDeviceMapper: {
        '351802052765899': 1
    },

    startConnection: function () {
        if (!this.connection) {
            var configs = config.mysql;

            this.connection = mysql.createConnection({
                host     : configs.host,
                user     : configs.user,
                password : configs.password,
                database : configs.database
            });
        }

        this.connection.connect();
    },

    stopConnection: function () {
        this.connection.end();
    },

    query: function (query, data, callback) {
        this.startConnection();

        this.connection.query(query, data, function (err, rows) {
            if (err) {
                this.logger.error(err);
                return false;
            }

            callback(rows);
        });

        this.stopConnection();
    },

    getSensors: function (callback) {
        this.query('SELECT * FROM sensor WHERE status = 1', [], function (rows) {
            callback(rows);
        });
    },

    getSensorMapper: function (callback) {
        this.getSensors(function (sensors) {
            var mapper = {};
            for (var sensor in sensors) {
                mapper[sensor.key] = sensor.id;
            }

            callback(mapper);
        });
    },

    saveMsg: function (data) {
        var deviceId;

        if (typeof data.dev === 'undefined') {
            logger.error('undefined device id', data);
        }

        deviceId = this.testDeviceMapper[data.dev];

        this.getSensorMapper(function (sensors) {
            console.log(sensors);
            // this.query('INSERT INTO data (fk_device, fk_sensor, data) VALUES ' + values + '');
        });
    },

    setLogger: function (logger) {
        this.logger = logger;
    }
};

module.exports = model;