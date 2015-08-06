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
        this.connection = null;
    },

    query: function (query, data, callback) {
        if (!this.connection) {
            throw Error('No MySQL connection!');
        }

        var _this = this;
        this.connection.query(query, data, function (err, rows) {
            if (err) {
                _this.logger.error(err);
                return false;
            }

            typeof callback !== 'undefined' && callback(rows);
        });
    },

    /**
     * get list of sensor information
     * @param  {Function} callback
     * @return {[object]} array of objects
     */
    getSensors: function (callback) {
        this.query('SELECT `id`, `key`, `status` FROM sensor WHERE status = 1 OR status = 2', [], function (rows) {
            callback(rows);
        });
    },

    getSensorMapper: function (callback) {
        this.getSensors(function (sensors) {
            var mMapper = {}, sMapper = {}, sensor;
            for (var id in sensors) {
                sensor = sensors[id];
                if (sensor.status == 1) {
                    mMapper[sensor.key] = sensor.id;
                } else {
                    sMapper[sensor.key] = sensor.id;
                }
            }

            callback(mMapper, sMapper);
        });
    },

    getDeviceId: function (devideKey) {
        if (typeof this.testDeviceMapper[devideKey] !== 'undefined') {
            return this.testDeviceMapper[devideKey];
        }

        // TODO: decode hashed key to id, check the exist in db

        return devideKey;
    },

    /**
     * store a socket message to MySQL database
     * @param  {json} msg socket message
     */
    saveMsg: function (msg) {
        var fkDevice, _this = this;

        if (typeof msg.dev === 'undefined') {
            _this.logger.error('undefined device id', msg);
        }

        fkDevice = _this.testDeviceMapper[msg.dev];

        _this.startConnection();
        _this.getSensorMapper(function (mMapper, sMapper) {
            console.log('sensors', mMapper);

            var mValues = [], sValues = {};
            for (var key in msg) {
                console.log('key', key);
                if (typeof mMapper[key] !== 'undefined') {
                    mValues.push('(' + [fkDevice, mMapper[key], msg[key]].join(',') + ')');
                } else if (typeof sMapper[key] !== 'undefined') {
                    sValues[key] = msg[key];
                }
            }

            if (mValues.length) {
                mValues = mValues.join(',');
                console.log('values', mValues);
                _this.query('INSERT INTO data (fk_device, fk_sensor, data) VALUES ' + mValues + '');
            }

            if (sValues.length) {
                _this.query('UPDATE device SET data = ? WHERE id = ?', [JSON.stringify(sValues), fkDevice]);
            }

            _this.stopConnection();
        });
    },

    setLogger: function (logger) {
        this.logger = logger;
    }
};

module.exports = model;