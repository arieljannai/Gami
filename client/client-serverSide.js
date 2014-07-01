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

        function Controller($scope) {
        $scope.rules = [];

        $scope.update = function(rule) {
          $scope.rules.push(angular.copy(rule));
        };

        $scope.send = function() {
            var rulesArr = $scope.rules;
          
          // send to db 
          db.collection('rules', function (err, collection) {
            for (var i = 0; i < rulesArr.length; i++) {
                collection.insert({"project": rulesArr[i].project ,"rule": rulesArr[i].rule, "points":rulesArr[i].points});

            };
            
            });

        };
      }

