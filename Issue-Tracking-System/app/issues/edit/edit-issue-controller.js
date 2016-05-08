(function() {
	'use strict';
	angular.module('issueTrackingSystem.issues.edit', ['issueTrackingSystem.issues.issueServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/issues/:id/edit', {
				templateUrl: 'app/issues/edit/edit-issue.html',
				controller: 'EditIssueCtrl',
				access: {
					isAuthenticated: true
				}
			})
		}])
		.controller('EditIssueCtrl', [
			'$scope',
			'$routeParams',
			'$location',
			'issueServices',
			'projectServices',
			'userServices',
			function($scope, $routeParams, $location, issueServices, projectServices, userServices) {
				userServices.getAllUsers()
					.then(function(users) {
						$scope.users = users;
					});

				issueServices.getIssueById($routeParams.id)
					.then(function(currentIssue) {
						$scope.issue = currentIssue;
						$scope.issue.AssigneeId = currentIssue.Assignee.Id;

						$scope.issue.DueDate = new Date(currentIssue.DueDate);

						if(currentIssue.Author.Id === sessionStorage.id) {
							$scope.isLead = true;
						}
						
						$scope.isAdmin = sessionStorage.hasAdminRights;

						projectServices.getProjectById(currentIssue.Project.Id)
							.then(function(returnedProject) {
								$scope.currentProject = returnedProject;
								$scope.issue.PriorityId = currentIssue.Priority.Id;
							})
					});

				$scope.changeIssueStatus = function(issueId, newStatus) {
					issueServices.changeIssueStatus(issueId, newStatus.Id)
						.then(function(returnedStatuses) {
							$scope.issue.Status = newStatus;
							$scope.issue.AvailableStatuses = returnedStatuses;
						})
				};

				$scope.editIssue = function(issueId) {
					issueServices.editIssue($scope.issue)
						.then(function(editedIssue) {
							toastr.success('Issue edited successfully');
							var path = 'issues/' + editedIssue.Id;
							$location.path(path);
						})
				};
			}
		]);
})();