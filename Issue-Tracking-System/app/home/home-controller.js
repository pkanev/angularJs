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
			'$rootScope',
			'$scope',
			'$location',
			'authentication',
			'identity',
			'toastr',
			function($rootScope, $scope, $location, authentication, identity, toastr) {

				$rootScope.isAuthenticated = identity.isAuthenticated();
				$rootScope.isAdmin = identity.isAdmin();
				$rootScope.currentUser = identity.getCurrentUser();

				$scope.login = function(user) {
					authentication.loginUser(user)
						.then(function(loggedInUser) {
							toastr.info('Welcome, ' + loggedInUser.userName);
							$rootScope.currentUser = loggedInUser;
							$rootScope.isAuthenticated = identity.isAuthenticated();
							$rootScope.isAdmin = identity.isAdmin();
							$location.path('/');
						})
				};

				$scope.register = function(user) {
				authentication.registerUser(user)
					.then(function(registeredUser) {
						toastr.info('Successful registration');
						$rootScope.currentUser = registeredUser;
						$rootScope.isAuthenticated = identity.isAuthenticated();
						$rootScope.isAdmin = identity.isAdmin();
						$location.path('/');
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
					$location.path('/issues/add');	
				}
			}
		])
	
})(); 
