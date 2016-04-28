(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects.create', ['issueTrackingSystem.projects.projectServices', 'issueTrackingSystem.users.userServices'])
		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				isAdmin: ['$q', 'identity', function($q, identity) {
					if(identity.isAdmin()) {
						return $q.when(true);
					} else {
						return $q.reject('Unauthorized');
					}
				}]
			};

			$routeProvider.when('/projects/add', {
				templateUrl: 'app/projects/create/create-project.html',
				controller: 'CreateProjectCtrl',
				resolve: routeChecks.isAdmin
			});
		}])
		.controller('CreateProjectCtrl', [
			'$scope',
			'$location',
			'projectServices',
			'userServices',
			'toastr',
			function($scope, $location, projectServices, userServices, toastr) {
				userServices.getAllUsers()
					.then(function(users) {
						$scope.users = users;
					});

				$scope.project = {
					Labels: [],
					Priorities: [] 
				};

				$scope.addNewLabel = function() {
					var newLabel = {
						Name: ''
					};

					$scope.project.Labels.push(newLabel);
				};

				$scope.removeLabel = function() {
					$scope.project.Labels.pop();
				};

				$scope.addNewPriority = function() {
					var newPriority = {
						Name: ''
					};

					$scope.project.Priorities.push(newPriority);
				};

				$scope.removePriority = function() {
					$scope.project.Priorities.pop();
				};

				$scope.createProject = function(project) {

				}
			}
		]);
})();