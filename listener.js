// ********************************************************
//	Listen socket
// ********************************************************
var listener = require('express')();
var listener_http = require('http').Server(listener);
var io = require('socket.io')(listener_http);
var listener_port = 3000;

listener.get('/', function(req, res){
	res.sendFile(__dirname + '/test.html');
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
	console.log('user disconnected');
  });
});



io.on('connection', function(socket){
  socket.on('message', function(msg){

    io.emit('message', msg);
    console.log('message: ' + msg);
    	 });
    socket.on('redisSub', function(msg){
    	io.emit('message', msg);
    console.log('redisSub: ' + msg.deviceId);
    	 });

    socket.on('data', function(msg){
    	console.log('data: ' + msg)
    });

    socket.on('reqInitProject', function(msg){



      console.log("init Project");
      
      // weathers = {
      //     active: 'temp',
      //     series: {
      //         temp: ['Nhiệt độ'],
      //         humid: ['Độ ẩm'],
      //         precip: ['Lượng mưa'],
      //         wind: ['Gió']
      //     },
      //     units: {
      //         temp: '°C',
      //         humid: '%',
      //         precip: '%',
      //         wind: 'km/h'
      //     },
      //     data: {
      //         temp: [],
      //         humid: [],
      //         precip: [],
      //         wind: [],
      //     },
      //     labels: [],
      //     options: getLineOptions()
      // };

      // //var stats = getStats(7);

      var results;

      var zoneDetail =  model.getZoneDetail();

      results = extend({}, zoneDetail);

      console.log(results);

      // Send initData
      io.emit('resInitProject', results);

    });

    socket.on('getProjectImages', function(msg) {
      var images = [
                {
                    image: '1.jpeg',
                    h: 2,
                    w: 2
                },
                {
                    image: '2.jpeg',
                    h: 3,
                    w: 3
                },
                {
                    image: '3.jpeg',
                    h: 3,
                    w: 4
                },
                {
                    image: '4.jpeg',
                    h: 5,
                    w: 6
                },
                 {
                    image: '24.jpeg',
                    h: 1120,
                    w: 60
                }
            ];
      io.emit('getProjectImages', images);
    });

});

listener_http.listen(listener_port, function(){
  console.log('>> listen socket on: ' + listener_port);
});