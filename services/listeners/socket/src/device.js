var net = require('net');

var client = new net.Socket();

function randomInt(value, dt) {
    var min = value - dt,
        max = value + dt;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.connect(3000, 'api.demeter.vn', function() {
// client.connect(6001, '127.0.0.1', function() {
    console.log('Connected');
    // client.write(JSON.stringify({ dev: '862118025168888', tim: Math.floor((+new Date())/ 1000), lat: 11.884473, lon: 108.563549, temp: randomInt(10, 100), humid: 40, pmois: 1500, rain: 1, light: 1000, height: 1000, bat: 1000, sig: 1000, fwr: 'FAGV1.1' }));
});


client.on('data', function(data) {
    console.log('Received: ' + data);
});

client.on('close', function() {
    console.log('Connection closed');
});