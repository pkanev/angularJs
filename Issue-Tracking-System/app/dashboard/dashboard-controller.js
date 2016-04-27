(function () {
	'use strict';
	angular.module('issueTrackingSystem.dashboard', ['issueTrackingSystem.users.authentication'])
		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				isAuthenticated: ['$q', 'identity', function($q, identity) {
					if(identity.isAuthenticated()) {
						return $q.when(true);
					} else {
						return $q.reject('Unauthorized');
					}
				}]
			};


			$routeProvider.when('/dashboard', {
				templateUrl: 'app/dashboard/dashboard.html',
				controller: 'DashboardCtrl',
				resolve: routeChecks.isAuthenticated
			});
		}])
		.controller('DashboardCtrl', [
			'$scope',
			'$location',
			'authentication',
			'identity',
			function($scope, $location, authentication, identity) {
				$scope.loadProjects = function() {
					$location.path('/projects/');
				}

				$scope.addProject = function() {
					$location.path('/projects/add');
				}
			}
		])
	
})(); 