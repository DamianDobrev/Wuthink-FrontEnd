app.controller('HomeCtrl', ['$scope', function($scope){
	$scope.$questionsCount = 0;
	Requests.getQuestionsCount($scope);
	$scope.$answersCount = 0;
	Requests.getAnswersCount($scope);
}]);