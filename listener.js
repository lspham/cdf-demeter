// ********************************************************
//  Json DB
// ********************************************************
var JsonDB = require('node-json-db');
var db = new JsonDB("myDB", true, false);


// // Get Local IP
// var os = require('os');

// var interfaces = os.networkInterfaces();
// var addresses = [];
// for (var k in interfaces) {
//     for (var k2 in interfaces[k]) {
//         var address = interfaces[k][k2];
//         if (address.family === 'IPv4' && !address.internal) {
//             addresses.push(address.address);
//         }
//     }
// }
// db.push("/setting", {ip: addresses});

// var data = db.getData("/setting");
// console.log("data db" + JSON.stringify(data));

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



io.on('connection', function(socket) {
    socket.on('message', function(msg) {

        io.emit('message', msg);
        console.log('message: ' + msg);
  	 });

    socket.on('redisSub', function(msg) {
        io.emit('message', msg);
        console.log('redisSub: ' + msg.deviceId);
    });

    socket.on('device-data', function(msg) {
        console.log('dev-data: ' + msg)
        var tmp = JSON.parse(msg);
        db.push(tmp.deviceid, tmp.data);
		    io.emit('data', msg);
    });
	
    socket.on('data', function(msg){
        console.log('data: ' + msg)
    });

    socket.on('reqInitProject', function(msg) {
        console.log("init Project");
        var results;
        var zoneDetail =  model.getZoneDetail();
        results = extend({}, zoneDetail);
        console.log(results);

        // Send initData
        io.emit('resInitProject', results);

    });

    socket.on('getProjectImages', function(msg) {
      io.emit('getProjectImages', images);
    });
	
	socket.on('device-connect', function (msg) {
		console.log("device: " + msg)
	});

});

listener_http.listen(listener_port, function(){
  console.log('>> listen socket on: ' + listener_port);
});

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
//    socket.on('message', function(msg){
//    	io.emit('message', msg);
//    	console.log('message: ' + msg);
//    });
    socket.on('redisSub', function(msg){
    	io.emit('message', msg);
   	console.log('redisSub: ' + msg.deviceId);
    });

    socket.on('device-data', function(msg){
    	console.log('dev-data: ' + msg);
	io.emit('data', msg);

	var onlineData = {
	    "deviceId": -1,
	    "online": ""
	};
	var dataMsg = JSON.parse(msg);
	onlineData.deviceId = dataMsg.deviceid;
	onlineData.online = "true";
	io.emit('online',onlineData);
    });

//    socket.on('data', function(msg){
//    	console.log('data: ' + msg);
//    });

    socket.on('reqInitProject', function(msg){
      console.log("init Project");
      var results;
      var zoneDetail =  model.getZoneDetail();
      results = extend({}, zoneDetail);
      console.log(results);

      // Send initData
      io.emit('resInitProject', results);
    });

    socket.on('getProjectImages', function(msg) {
      io.emit('getProjectImages', images);
    });
	
	socket.on('device-connect', function (msg) {
		console.log("device: " + msg)
	});

});

listener_http.listen(listener_port, function(){
  console.log('>> listen socket on: ' + listener_port);
});
