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

				$scope.isAuthenticated = identity.isAuthenticated();
				$scope.isAdmin = identity.isAdmin();
				identity.getCurrentUser()
					.then(function(user) {
						$scope.currentUser = user;
					});

				$scope.login = function(user) {
					authentication.loginUser(user)
						.then(function(loggedInUser) {
							toastr.info('Welcome, ' + loggedInUser.userName);
							$scope.currentUser = loggedInUser;
							$scope.isAuthenticated = identity.isAuthenticated();
							$scope.isAdmin = identity.isAdmin();
							$location.path('/fakepath');
						})
				};

				$scope.register = function(user) {
				authentication.registerUser(user)
					.then(function(registeredUser) {
						toastr.info('Successful registration');
						var userToLogin = {
							Username: user.email,
							Password: user.password
						};
						$scope.login(userToLogin);
					});
				};
			}
		])
	
})(); 
