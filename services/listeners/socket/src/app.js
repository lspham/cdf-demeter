var io = require('socket.io')();

io.on('connection', function (socket) {
    console.log('Created socket server.');
    socket.on('data', function (msg) {
        console.log(msg);
    });

    socket.on('disconnect', function () {
        console.log('Disconnected.');
    });
});

io.listen(6001);
