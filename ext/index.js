module.exports = function (app) {
//var app = require('express');
//var http = require('http');
var io = require('socket.io')(app);

/*io.on('connection', function (socket) {
  socket.on('new message', function(msg){
    	io.emit('message', msg);
  });
});*/

return function push (msg) {
	console.log('here - ' + msg);
	io.emit('message', msg);
};
};