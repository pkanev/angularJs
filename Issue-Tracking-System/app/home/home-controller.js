(function () {
	'use strict';
	angular.module('issueTrackingSystem.home', [])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl'
			});
		}])
		.controller('HomeCtrl', [
			'$scope',
			function($scope) {
				$scope.name = 'pesho';
			}
		])
	
})(); 
