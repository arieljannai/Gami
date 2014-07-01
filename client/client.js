var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('client.html');

var bodyParser=require('body-parser')
var express = require('express');
var app = express();
app.use('/static', express.static(__dirname));
app.use(bodyParser.json());

// connect to mongo
var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('Gami', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'db' database");
        db.collection('userGamification', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'userGamification' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});


app.post('/send', function (req,res) {
	db.collection('rules', function (err, collection) {
		rulesArr = req.body;
		for (var i = 0; i < rulesArr.length; i++) {
      		collection.insert({"project": rulesArr[i].http ,"rule": rulesArr[i].rule, "points": rulesArr[i].points});
      	};	
	});
});


app.listen(1234);