var app = require('express')();
var serveStatic = require('serve-static');
var http = require('http').Server(app);
var port = 8080;

// Serve file folder
app.use(serveStatic(__dirname + '/html'));

// Routing
app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/application', function(req, res){
  res.sendFile(__dirname + '/html/ung-dung.html');
});

app.get('/about', function(req, res){
  res.sendFile(__dirname + '/html/gioi-thieu.html');
});

// Create server
http.listen(port, function(){
  console.log('listening on *:' + port);
});


var app1 = require('express')();
var serveStatic1 = require('serve-static');
var http1 = require('http').Server(app1);
var port1 = 8081;

// Serve file folder
app1.use(serveStatic1(__dirname + '/services/app'));

// Routing
app1.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});

// Create server
http1.listen(port1, function(){
  console.log('listening on *:' + port1);
});
