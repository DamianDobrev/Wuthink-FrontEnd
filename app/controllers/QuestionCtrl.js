app.controller('QuestionCtrl', function($scope, $routeParams) {
	var getQuestionInfo = function () {
		if ($scope.$question.IsMultiChoice == true) {
			$('#answers li input').attr('type', 'checkbox').addClass('checkboxRemove');
			$('#answers li label').addClass('checkboxLabel');
		}
		else {
			$('#answers li input').attr('type', 'radio').addClass('radioRemove');
			$('#answers li label').addClass('radioLabel');
		}
	}
	Requests.getSingleQuestionInfo($scope, $routeParams.question_id, getQuestionInfo);



	$scope.$vote = function () {
		var allAnswerIds = [];
		$('#answers li input:checked').each(function(index){
			allAnswerIds.push($(this).val());
		});

		Requests.vote(allAnswerIds, $routeParams.question_id);
	}
});