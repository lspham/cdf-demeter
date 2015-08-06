var net = require('net'),
    config = require('./config'),
    model = require('./model'),
    bunyan = require('bunyan');

// init logger
var logger = bunyan.createLogger({
    name: "demeter.socket",
    streams: [
        {
            level: 'info',
            path: config.logs.dir + config.logs.info,
            stream: process.stdout
        },
        {
            level: 'error',
            path: config.logs.dir + config.logs.error,
            stream: process.stdout
        }
    ]
});

// set logger
model.setLogger(logger);

// init server
net.createServer(function (socket) {
    var clientInfo = {
        ip: socket.remoteAddress,
        port: socket.removePort
    };

    logger.info('connected', clientInfo);

    socket.on('data', function (data) {
        var msg = JSON.parse(data.toString());
        model.saveMsg(msg);
        logger.info('received data', msg);
    });

    socket.on('disconnect', function () {
        logger.info('closed', clientInfo);
    });
}).listen(6001, '127.0.0.1');

logger.info('started server');
