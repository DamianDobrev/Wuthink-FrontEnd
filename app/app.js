'use strict';

var app = angular.module('WuthinkApp', ['ngRoute', 'ngAnimate']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl',
		replace: true
	})
	.when('/ask', {
		templateUrl: 'templates/ask.html',
		controller: 'AskCtrl',
		replace: true
	})
	.when('/questions', {
		templateUrl: 'templates/questions.html',
		controller: 'QuestionsCtrl',
		replace: true
	})
	.when('/question/:question_id', {
		templateUrl: 'templates/question.html',
		controller: 'QuestionCtrl',
		replace: true
	})
	.when('/question/:question_id/delete/:delete_id', {
		templateUrl: 'templates/delete.html',
		controller: 'DeleteCtrl',
		replace: true
	})
	.otherwise({
    	redirectTo: '/home',
		replace: true
	})
}]);
