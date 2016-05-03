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
			'$rootScope',
			'$scope',
			'$routeParams',
			'$location',
			'issueServices',
			'projectServices',
			'userServices',
			function($rootScope, $scope, $routeParams, $location, issueServices, projectServices, userServices) {
				userServices.getAllUsers()
					.then(function(users) {
						$scope.users = users;
					});

				issueServices.getIssueById($routeParams.id)
					.then(function(currentIssue) {
						$scope.issue = currentIssue;
						console.log(currentIssue.Id);
						$scope.issue.AssigneeId = currentIssue.Assignee.Id;

						var year = parseInt(currentIssue.DueDate.slice(0, 4));
						var month = parseInt(currentIssue.DueDate.slice(5, 7));
						var day = parseInt(currentIssue.DueDate.slice(8, 10));
						var date = new Date(year, month, day);

						$scope.issue.DueDate = date;

						if(currentIssue.Author.Id === $rootScope.currentUser.Id) {
							$scope.isLead = true;
						}
						$scope.isAdmin = $rootScope.currentUser.isAdmin;

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
							console.log(editedIssue);
							toastr.success('Issue edited successfully');
							var path = 'issues/' + editedIssue.Id;
							$location.path(path);
						})
				};
			}
		]);
})();