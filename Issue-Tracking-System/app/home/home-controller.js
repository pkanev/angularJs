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
			'toastr',
			function($scope, $location, authentication, identity, toastr) {
				if(identity.isAuthenticated()) {
					$location.path('/dashboard');
				}


				$scope.login = function(user) {
					authentication.loginUser(user)
						.then(function(loggedInUser) {
							toastr.info('Welcome, ' + loggedInUser.userName);
							$location.path('/dashboard');
						})
				};

				$scope.register = function(user) {
				authentication.registerUser(user)
					.then(function(registeredUser) {
						toastr.info('Successful registration');
						$location.path('/dashboard');
					});
				};
			}
		])
	
})(); 
