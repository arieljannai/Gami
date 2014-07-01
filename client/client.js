function Controller($scope) {
	    $scope.rules = [];

	    $scope.update = function(rule) {
	      $scope.rules.push(angular.copy(rule));
	    };

	    $scope.send = function() {
	      // send to db 
	    };
	  }