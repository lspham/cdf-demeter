var mysql = require('mysql'),
    config = require('./config');

var model = {
    connection: null,
    logger: null,
    testDeviceMapper: {
        '862118025168888': 2, // điều khiển
        '862118025169999': 1 // thời tiết
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

    parseTime: function (timeStr) {
        return new Date(timeStr * 1000).toISOString().slice(0, 19).replace('T', ' ');
    },

    /**
     * store a socket message to MySQL database
     * @param  {json} msg socket message
     */
    saveMsg: function (msg) {
        var fkDevice, _this = this;

        if (typeof msg.dev === 'undefined') {
            _this.logger.error('undefinedDeviceId', msg);
            return false;
        }

        fkDevice = _this.getDeviceId(msg.dev);

        _this.startConnection();
        _this.getSensorMapper(function (mMapper, sMapper) {
            console.log('sensors', mMapper);

            // parse tim
            if (typeof msg['tim'] === 'undefined') {
                _this.logger.error('undefinedTim', msg);
                return false;
            }

            createdTime = _this.parseTime(msg['tim']);

            var mValues = [], sValues = {};
            for (var key in msg) {
                console.log('key', key);
                if (typeof mMapper[key] !== 'undefined') {
                    mValues.push('(' + [fkDevice, mMapper[key], msg[key], "'" + createdTime + "'"].join(',') + ')');
                } else if (typeof sMapper[key] !== 'undefined') {
                    sValues[key] = msg[key];
                }
            }

            if (mValues.length) {
                mValues = mValues.join(',');
                console.log('values', mValues);
                _this.query('INSERT INTO data (fk_device, fk_sensor, data, created_at) VALUES ' + mValues + '');
            }

            if (Object.keys(sValues).length) {
                _this.query('UPDATE device SET data = ? WHERE id = ?', [JSON.stringify(sValues), fkDevice]);
            }

            _this.stopConnection();
        });
    },

    setLogger: function (logger) {
        this.logger = logger;
    },

    fetchInitData: function(deviceId, callback) {
        this.startConnection();

        var query = "SELECT `sensor`.`key`, `data`.`data`, `data`.`created_at`, UNIX_TIMESTAMP(`data`.`created_at`) as tim FROM `data` JOIN `sensor` ON `sensor`.`id` = `data`.`fk_sensor` WHERE `data`.`fk_device` = 2 AND DATE(`data`.`created_at`) = DATE(NOW()) ORDER BY `data`.`created_at` DESC";
        this.query(query, [], function(rows) {
            var stats = {
                labels: {},
                data: {}
            };

            for (var i in rows) {
                var row = rows[i],
                    tim = new Date(row['tim'] * 1000 + 7 * 60 * 60 * 1000),
                    min = tim.getMinutes(),
                    sec = tim.getSeconds(),
                    hour = tim.getHours();

                if (min < 10) {
                    min = '0' + min;
                }

                if (sec < 10) {
                    sec = '0' + sec;
                }

                if (hour < 10) {
                    hour = '0' + hour;
                }


                tim = hour + ':' + min + ':' + sec;

                if (Object.keys(stats.labels).length < 7) {
                    stats.labels[tim] = true;
                }

                if (typeof stats.data[row['key']] === 'undefined') {
                    stats.data[row['key']] = [];
                }

                if (stats.data[row['key']].length < 7) {
                    stats.data[row['key']].push(row['data']);
                }
            }
            stats.labels = Object.keys(stats.labels);
            callback(stats);
        });

        this.stopConnection();
    },

    getControllerStatuses: function (deviceId, callback) {
	this.startConnection();

	this.query('SELECT `data` FROM `device` WHERE `id` = 2', [], function(rows) {
	    console.log('getControllerStatuses', rows);
	    callback(rows);
	});

	this.stopConnection();
    }


};

module.exports = model;
