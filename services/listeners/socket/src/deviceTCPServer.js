var net = require('net'),
    config = require('./config'),
    model = require('./model'),
    bunyan = require('bunyan'),
    redis = require("redis"),
    redisSubClient,
    redisPubClient;

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

// init redis
redisSubClient = redis.createClient();
redisClient = redis.createClient();
redisPubClient = redis.createClient();

redisClient.on('error', function(error) {
    console.log('RedisError ' + error);
});

redisSubClient.on('error', function(error) {
    console.log('RedisError ' + error);
});

redisPubClient.on('error', function(error) {
    console.log('RedisError ' + error);
});

// init server
net.createServer(function(socket) {
    var clientInfo = {
        ip: socket.remoteAddress,
        port: socket.removePort
    }, isSubcribed = false;

    logger.info('clientConnected', clientInfo);
    redisClient.set('deviceOnline', 1);

    socket.on('data', function(data) {
        var msg;

        try {
            data = data.toString();
            msg = JSON.parse(data);
        } catch (e) {
            logger.error('invalidMessage', {data: data, msg: msg});
            return false;
        }

        model.saveMsg(msg);
        logger.info('dataReceived', msg);

        if (typeof msg.dev !== 'undefined') {
            // subcribe to redis command
            if (!isSubcribed) {
                var cmdChannel = 'things/' + msg.dev + '/cmd';
                redisSubClient.subscribe(cmdChannel);
                logger.info('redisSub', cmdChannel);

                redisSubClient.on('message', function(channel, message) {
                    logger.info('onRedisMessage', channel, message);
                    socket.write(message);
                });

                isSubcribed = true;
            }

            // publish to redis data
            var dataChannel = 'things/' + msg.dev + '/data';
            var strMsg = JSON.stringify(msg);
            redisPubClient.publish(dataChannel, strMsg);
            logger.info('redisPub', dataChannel, strMsg);
        }
    });

    socket.on('error', function(error) {
        logger.info('socketError', error);
    });

    socket.on('close', function() {
        logger.info('closed', clientInfo);
        redisClient.set('deviceOnline', 0);
    });

}).listen(6001, '127.0.0.1');

logger.info('serverStarted');
