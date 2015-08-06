var net = require('net');

var client = new net.Socket();
client.connect(6001, '127.0.0.1', function() {
    console.log('Connected');
    client.write(JSON.stringify({"dev":351802052765899,"tim":150805203400,"lat":10.832724,"lon":106.730110,"temp":30.1,"humid":40,"pmois":50,"rain":30,"light":10,"height":11.5,"bat":12.1,"sig":26,"fwr":"1.111"}));
});

client.on('data', function(data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function() {
    console.log('Connection closed');
});