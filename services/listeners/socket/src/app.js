var net = require('net')(),
    config = require('./config'),
    model = require('./model'),
    bunyan = require('bunyan');

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
model.setLogger(logger);

net.createServer(function (socket) {
    logger.info('a client connected', {
        ip: socket.remoteAddress,
        port: socket.removePort
    });

    socket.on('data', function (data) {
        console.log(data.toString());
        // model.saveMsg(msg);
        // logger.info('received data', msg);
    });

    socket.on('disconnect', function () {
        logger.info('a client disconnected');
    });
}).listen(6001, '127.0.0.1');

logger.info('started server');
