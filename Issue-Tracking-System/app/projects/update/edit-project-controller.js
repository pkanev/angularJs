(function () {
	'use strict';
	angular.module('issueTrackingSystem.projects.edit', ['issueTrackingSystem.projects.projectServices'])
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

			$routeProvider.when('/projects/:id/edit', {
				templateUrl: 'app/projects/update/edit-project.html',
				controller: 'EditProjectCtrl',
				resolve: routeChecks.isAdmin
			});
		}])
		.controller('EditProjectCtrl', [
			'$scope',
			'$routeParams',
			'projectServices',
			function($scope, $routeParams, projectServices) {
				projectServices.getProjectById($routeParams.id)
					.then(function(project) {
						$scope.project = project;
						$scope.labels = project.Labels;
						$scope.priorities = project.Priorities;
					});

				$scope.addNewLabel = function() {
					var newLabel ={
						Name:''
					};

					$scope.labels.push(newLabel);
				};

				$scope.removeLabel = function() {
					$scope.labels.pop();
				};

			}
		]);
})();