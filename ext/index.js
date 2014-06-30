var PORT = 3700;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	io.emit('message', 	
		JSON.stringify( 
			{ 	
				msg:"whats up?"
			}
		));
  socket.on('new message', function(msg){
    	io.emit('message', msg);
  });
});

http.listen(PORT, function(){
  console.log('listening on *:3700');
});

//socket.emit('chat message', $('#m').val());
