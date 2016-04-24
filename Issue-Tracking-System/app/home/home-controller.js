(function () {
	'use strict';
	angular.module('issueTrackingSystem.home', ['issueTrackingSystem.users.authentication'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl'
			});
		}])
		.controller('HomeCtrl', [
			'$scope',
			'$location',
			'authentication',
			'identity',
			function($scope, $location, authentication, identity) {
				if(identity.isAuthenticated()) {
					$location.path('/projects');
				}


				$scope.login = function(user) {
					authentication.loginUser(user)
						.then(function(loggedInUser) {
							$location.path('/projects');
						})
				};

				$scope.register = function(user) {
				authentication.registerUser(user)
					.then(function(registeredUser) {
						$location.path('/projects');
					});
				};
			}
		])
	
})(); 
