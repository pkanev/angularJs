(function () {
	'use strict';
	angular.module('issueTrackingSystem.issues.add', [])
		.config(['$routeProvider', function($routeProvider){
			$routeProvider.when('/issues/add-issue', {
				templateUrl: 'app/issues/add/add-issue.html',
				controller: 'AddIssueCtrl',
				access: {
					isAuthenticated: true
				}
			});
			$routeProvider.when('/projects/:id/issues/add-issue', {
				templateUrl: 'app/issues/add/add-issue.html',
				controller: 'AddIssueCtrl',
				access: {
					isAuthenticated: true
				}
			});
		}])
		.controller('AddIssueCtrl', [
			'$scope',
			'$routeParams',
			'$location',
			'projectServices',
			'issueServices',
			'userServices',
			'toastr',
			function($scope, $routeParams, $location, projectServices, issueServices, userServices, toastr) {

				$scope.issue = {
					Labels: []
				};

				userServices.getAllUsers()
					.then(function(users) {
						$scope.users = users;
					});

				projectServices.getAllProjects()
					.then(function(projects) {
						$scope.projects = projects;
					})
					.then(function() {
						if ($routeParams.id) {
							projectServices.getProjectById($routeParams.id)
								.then(function(returnedProject) {
									$scope.issue.ProjectId = returnedProject.Id;
									$scope.currentProject = returnedProject;

									if(returnedProject.Lead.Id === sessionStorage.id) {
										$scope.isLead = true;
									}
							
									$scope.isAdmin = sessionStorage.hasAdminRights;
								})
						}
					});

				$scope.updatePriorities = function(projectId) {
					projectServices.getProjectById(projectId)
						.then(function(returnedProject) {
							$scope.currentProject = returnedProject;

							if(returnedProject.Lead.Id === sessionStorage.id) {
								$scope.isLead = true;
							} else {
								$scope.isLead = false;
							}
							
							$scope.isAdmin = sessionStorage.hasAdminRights;
						})
				}

				$scope.addNewLabel = function() {
					var newLabel = {
						Name: ''
					};

					$scope.issue.Labels.push(newLabel);
				};

				$scope.removeLabel = function() {
					$scope.issue.Labels.pop();
				};

				$scope.addIssue = function(issue) {
					issueServices.addIssue(issue)
						.then(function(createdIssue) {
							toastr.success('Issue created successfully');
							var path = 'issues/' + createdIssue.Id;
							$location.path(path);
						})
				}
			}
		]);
})();