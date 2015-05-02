app.controller('AskCtrl', function($scope, $location) {
	var currentAnswersCountPlusOne = $('#answersUl li').size();
	var questionToSend;
	$scope.$qanswers = [
	{
		text: ''
	},
	{
		text: ''
	}];

	$scope.addNewAnswer = function() {
		$scope.$qanswers.push({
			text: ''
		});
	}

	$scope.removeAnswer = function(obj) {
		$scope.$qanswers.splice(obj.$index,1);
	}

	$scope.$sendQuestion = function (){
		questionToSend = {
			qtext : $scope.$qtext,
			qanswers : $scope.$qanswers,
			qemail : $scope.$qemail,
			qisHidden : $scope.$isHidden,
			qisMultiChoice : $scope.$isMultiChoice,
			qtags : $scope.$tags
		}
		Requests.postQuestion($scope, questionToSend, $location);
	}
});