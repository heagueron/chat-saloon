var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Base endpoint:
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


// Endpoint for external connection (example spa or desktop app):
app.get('chat/', function(req, res){
  // Here, we won´t send an html file.
  // Just open the connection and let the 
  // external app manage the ui.
});

// Socket:
io.on('connection', function(socket){
  
  // Inform everyone that someone connected:
  io.emit('system message', 'Mensaje del Administrador: Se conectó un usuario');
  
  // Pass user messages for everyone:
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
});


// Start server
http.listen(3000, function(){
  console.log('listening on *:3000');
});