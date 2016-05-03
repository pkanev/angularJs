(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects.add', ['issueTrackingSystem.projects.projectServices', 'issueTrackingSystem.users.userServices'])
		.config(['$routeProvider', function($routeProvider) {
			// var routeChecks = {
			// 	isAdmin: ['$q', 'identity', function($q, identity) {
			// 		if(identity.isAdmin()) {
			// 			return $q.when(true);
			// 		} else {
			// 			return $q.reject('Unauthorized');
			// 		}
			// 	}]
			// };

			$routeProvider.when('/projects/add', {
				templateUrl: 'app/projects/add/add-project.html',
				controller: 'CreateProjectCtrl',
				access: {
					isAdmin: true
				}
				//resolve: routeChecks.isAdmin
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
					Priorities: [],
					Name: ''
				};

				$scope.updateKey = function() {
					$scope.project.ProjectKey = projectServices.createProjectKey($scope.project.Name);
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
					projectServices.createProject(project)
						.then(function(createdProject) {
							toastr.success(createProject.Name + ' was created successfully');
							var path = '/projects/' + createdProject.Id;
							$location.path(path);
						})
				};
			}
		]);
})();