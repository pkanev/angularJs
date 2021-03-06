(function () {
	'use strict';
	angular.module('issueTrackingSystem.projects.edit', ['issueTrackingSystem.projects.projectServices', 'issueTrackingSystem.users.userServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/projects/:id/edit', {
				templateUrl: 'app/projects/edit/edit-project.html',
				controller: 'EditProjectCtrl',
				access: {
					isAdminOrLead: true
				}
			});
		}])
		.controller('EditProjectCtrl', [
			'$scope',
			'$routeParams',
			'$location',
			'projectServices',
			'userServices',
			'toastr',
			function($scope, $routeParams, $location, projectServices, userServices, toastr) {

				projectServices.getProjectById($routeParams.id)
					.then(function(project) {
						$scope.project = project;
					})
					.then(function() {
						userServices.getAllUsers()
							.then(function(users) {
								$scope.users = users;
								$scope.project.LeadId = $scope.project.Lead.Id;
							});						
					});

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

				$scope.editProject = function(project) {
					var data = {
						Name: project.Name,
						Description: project.Description,
						Labels: [],
						Priorities: [],
						LeadId: project.LeadId
					};

					project.Labels.forEach(function(label) {
						data.Labels.push({Name: label.Name});
					});

					project.Priorities.forEach(function(priority) {
						data.Priorities.push({Name: priority.Name});
					});

					projectServices.editProject(project.Id, data)
						.then(function(editedProject) {
							toastr.success(editedProject.Name + ' was edited successfully.');
							var path = '/projects/' + editedProject.Id;
							$location.path(path);
						})
				};

			}
		]);
})();