app.controller('DeleteCtrl', function($scope, $routeParams, $location) {
	
	$scope.$question = {};

	Requests.getSingleQuestionInfo($scope, $routeParams.question_id);

	$scope.$deleteQuestion = function() {
		Requests.deleteQuestion($scope, $routeParams.delete_id, $location);
	}

	$scope.$goBack = function() {
    	$scope.$apply(function() { 
    		$location.path('/question/' + $routeParams.question_id); 
    	});
	}

});