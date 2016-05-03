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
				$scope.currentUser = identity.getCurrentUser();

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
						$scope.currentUser = registeredUser;
						$scope.isAuthenticated = identity.isAuthenticated();
						$scope.isAdmin = identity.isAdmin();
						$location.path('/fakepath');
					});
				};

				$scope.loadMyIssues = function() {
					$location.path('/issues/me');
				}

				$scope.loadProjects = function() {
					$location.path('/projects/');
				}

				$scope.addProject = function() {
					$location.path('/projects/add');
				}

				$scope.addIssue = function() {
					$location.path('/issues/add-issue');	
				}
			}
		])
	
})(); 
