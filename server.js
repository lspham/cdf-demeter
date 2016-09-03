var app = require('express')();
var serveStatic = require('serve-static');
var http = require('http').Server(app);
var port = 80;

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
