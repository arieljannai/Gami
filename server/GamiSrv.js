var server = require('express');
var app = server();
var httpHandler = require('./httpHandler');
var bodyParser = require('body-Parser');

app.use(bodyParser.json());

app.post('/', httpHandler.getHttpReq);

app.listen(3000);
console.log('server started on port 3000');