var io = require('socket.io')();

io.on('connection', function (socket) {
    socket.on('event', function (msg) {

    });

    socket.on('disconnect', function () {

    });
});

io.listen(6001);
