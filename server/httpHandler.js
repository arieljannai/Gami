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

exports.getHttpReq = function(req, res) {
	req.on('data', function (chunk) {
		db.collection('userGamification', function (err, collection) {
			var js = JSON.parse(chunk);
        	collection.update({"userName": js.name},{$inc: {"totalPoints": js.points}},{upsert:true});
        	if (err)
        		{console.log("error!! " + err);}
        });	
    });
    res.send(200,'good');
};