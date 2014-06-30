var server = require('express');
var app = server();
var http = require('http');
var httpServer = http.createServer(app);

var httpHandler = require('./httpHandler')(httpServer);
//var notification = require('../ext/index')(app);
var bodyParser = require('body-Parser');

app.use(bodyParser.json());

app.post('/', httpHandler);

httpServer.listen(3700);
console.log('server started on port 3700');