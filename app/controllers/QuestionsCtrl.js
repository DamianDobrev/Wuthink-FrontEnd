app.controller('QuestionsCtrl', function($scope, $timeout) {
	$scope.$sortBy = 'date';
	$scope.$tags = '';
	$scope.$questions = [];
	Requests.getAllQuestions($scope);

	$scope.$search = function () {
		Requests.getAllQuestions($scope);
	}

	$scope.getVotes = function (question) {
		var votes = 0;
		question.Answers.forEach(function(answer){
			votes = votes + answer.Votes;
		})

		return votes;
	}

	$scope.$getDate = function(date){
		return date.toString().substr(0, 10);
	}

	$scope.$getHours = function(date){
		return date.toString().substr(11, 8);
	}
});