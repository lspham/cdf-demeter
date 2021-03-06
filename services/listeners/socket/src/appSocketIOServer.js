var io             = require('socket.io')(6006),
    redis          = require('redis'),
    model          = require('./model');
    redisClient    = redis.createClient(),
    redisSubClient = redis.createClient(),
    redisPubClient = redis.createClient();

io.on('connection', function(socket) {
    function updateOnlineStatus() {
        setInterval(function() {
            redisClient.get('deviceOnline', function(err, reply) {
                console.log('deviceOnline', err, reply);
                socket.emit('online', reply == 1 ? true : false);
            });
        }, 3000);
    }

    updateOnlineStatus();

    socket.on('redisSub', function(msg) {
        var dataChannel = 'things/' + msg.deviceId + '/data';
        redisSubClient.subscribe(dataChannel);
        console.log('redisSub', dataChannel);

        model.fetchInitData(msg.deviceId, function(data) {
            socket.emit('initData', data);
        });

        redisSubClient.on('message', function(channel, msg) {
            msg = JSON.parse(msg);
            socket.emit('data', msg);
            console.log('redisMsg', msg);
            // TODO: query to db to fetch new data?!
        });

    	model.getControllerStatuses(msg.deviceId, function(data) {
            socket.emit('initStatus', data);
    	});
    });

    socket.on('cmd', function(msg) {
        var cmdChannel = 'things/' + msg.deviceId + '/cmd';
        redisPubClient.publish(cmdChannel, msg.data);
        console.log('cmd', msg);
    });
});
