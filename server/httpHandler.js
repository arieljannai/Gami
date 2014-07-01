module.exports = function (app) {

var notification = require('../ext/index')(app);

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

return function (req, res) {
	req.on('data', function (chunk) {
		var js = JSON.parse(chunk);
		console.log("js.project: " + js.project);
        console.log("js.rule: " + js.rule);
		db.collection('rules', function (err, collection) {
            console.log("666 - " + collection);
            collection.find({"project": js.project ,"rule": js.rule},{"points":1,"_id":0}).toArray(function (err, results){
                console.log("results: " + results[0].points); // output all records
                db.collection('userGamification', function (err, collection1) {
                    collection1.update({"userName": js.username},{$inc: {"totalPoints": results[0].points}},{upsert:true});
                    // call push notification
                    var text = '{ "msg" : "Yey! You got ' + results[0].points + ' points!!"}';
                    notification(text);
                    if (err)
                        {console.log("error!! " + err);}
                }); 
            });
        });
    });
    res.send(200,'good');
};
};