var Requests = (function () {
	var baseUrl = 'http://94.26.100.87:2222/api';
	// var baseUrl = 'http://localhost:42315/api';
	var getAllQuestions = function($scope) {
		var sortby = $scope.$sortBy;
		var tags = $scope.$tags;

		var url = baseUrl + '/questions/by/' + sortby;

		if (tags != null && tags != '') {
			url = url + '/tags/';
			var tagsArray = tags.split(',');

			tagsArray.forEach(function(tag){
				var currentTag = tag.trim();
				url = url + currentTag + '|';
			});
			url = url.substring(0, url.length - 1);
		}

		$.ajax({
		    url: url,
		    method: "get",
		    success: function(data) {
		      $scope.$questions = data;
		      $scope.$apply();
		    },
		    error: function(error) {
		    	var n = noty({
		    		text: JSON.parse(error.responseText).Message, 
		    		type: 'error', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    }
		  });
	}

	var getQuestionsCount = function($scope) {
		$.ajax({
		    url: baseUrl + '/questions/count',
		    method: "get",
		    success: function(data) {
				$scope.$questionsCount = data;
				$scope.$apply();
		    },
		    error: function(error) {
		    	var n = noty({
		    		text: JSON.parse(error.responseText).Message, 
		    		type: 'error', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    }
		  });
	}

	var getAnswersCount = function($scope) {
		$.ajax({
		    url: baseUrl + '/answers/count',
		    method: "get",
		    success: function(data) {
		      $scope.$answersCount = data;
		      $scope.$apply();
		    },
		    error: function(error) {
		    	var n = noty({
		    		text: JSON.parse(error.responseText).Message, 
		    		type: 'error', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    }
		  });
	}

	var postQuestion = function($scope, question, $location) {
		var url = baseUrl + '/questions?';
		question.qanswers.forEach(function(answer){
			if (answer.text.length > 0) {
				answer.text = answer.text.trim();
				url = url + 'Answer=' + answer.text + '&';
			}
		});
		var tags = question.qtags;
		if (tags != null && tags.length > 0){
			tags = tags.split(',');
			tags.forEach(function(tag){
				tag = tag.trim();
				url = url + 'Tag=' + tag + '&';
			});
		}
		var isHidden = false;
		if (question.qisHidden == true) {
			isHidden = true;
		}
		var isMultiChoice = false;
		if (question.qisMultiChoice == true) {
			isMultiChoice = true;
		}
		$.ajax({
		    url: url,
		    data: {
		    	Text : question.qtext,
		    	Email : question.qemail,
		    	IsHidden : isHidden,
		    	IsMultiChoice : isMultiChoice
		    },
		    method: "post",
		    success: function(data) {
		    	$scope.$apply(function() { $location.path('/question/' + data.Id); });
		    	var n = noty({
		    		text: 'Congratulations! You have successfully posted a new question!\nUrl is: http://projects.damiandobrev.me/wuthink/#/question/' + data.Id +'\nDeleteUrl is: http://projects.damiandobrev.me/wuthink/#/question/"' + data.Id + '/delete/' + data.DeleteId, 
		    		type: 'success', 
		    		layout: 'topCenter',
		    		closeWith: ['button']
		    	});
		    },
		    error: function(error) {
		    	var n = noty({
		    		text: JSON.parse(error.responseText).Message, 
		    		type: 'error', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    }
		  });
	}

	var getSingleQuestionInfo = function($scope, id, fn) {
		$.ajax({
		    url: baseUrl + '/question/' + id,
		    method: "get",
		    success: function(data) {
				$scope.$question = data;
				$scope.$apply();
				if (fn != null){
					fn();
				}
		    },
		    error: function(error) {
		    	var n = noty({
		    		text: JSON.parse(error.responseText).Message, 
		    		type: 'error', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    }
		  });
	}

	var vote = function (votes, questionId) {
		var url = baseUrl + '/questions/' + questionId + '/answers?';
		votes.forEach(function(vote){
			url = url + 'a=' + vote + '&';
		})

		url = url.substring(0, url.length - 1);
		$.ajax({
		    url: url,
		    method: "post",
		    data: {},
		    success: function(data) {
		    	var n = noty({
		    		text: data, 
		    		type: 'success', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    },
		    error: function(error) {
		    	var n = noty({
		    		text: JSON.parse(error.responseText).Message, 
		    		type: 'error', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    }
		  });
	}

	var deleteQuestion = function($scope, deleteId, $location) {
		var url = baseUrl + '/questions/delete/' + deleteId;
		$.ajax({
		    url: url,
		    method: "post",
		    success: function(data) {
		    	$scope.$apply(function() { $location.path('/questions'); });
		    	var n = noty({
		    		text: "Question successfully deleted!", 
		    		type: 'success', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    },
		    error: function(error) {
		    	var n = noty({
		    		text: JSON.parse(error.responseText).Message, 
		    		type: 'error', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    }
		  });
	}

	return {
		getAllQuestions : getAllQuestions,
		getQuestionsCount : getQuestionsCount,
		getAnswersCount : getAnswersCount,
		postQuestion : postQuestion,
		getSingleQuestionInfo : getSingleQuestionInfo,
		vote : vote,
		deleteQuestion : deleteQuestion
	}
})();