(function() {
	'use strict';
	angular.module('issueTrackingSystem.issues.byId', ['issueTrackingSystem.issues.issueServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/issues/:id', {
				templateUrl: 'app/issues/issue-by-id/issue-by-id.html',
				controller: 'IssueByIdCtrl',
				access: {
					isAuthenticated: true
				}
			})
		}])
		.controller('IssueByIdCtrl', [
			'$scope',
			'$routeParams',
			'$location',
			'issueServices',
			function($scope, $routeParams, $location, issueServices) {
				issueServices.getIssueById($routeParams.id)
					.then(function(currentIssue) {
						$scope.issue = currentIssue;
						if(currentIssue.Author.Id === sessionStorage.id) {
							$scope.isLead = true;
						}
						if(currentIssue.Assignee.Id === sessionStorage.id) {
							$scope.isAssignee = true;
						}
						$scope.isAdmin = sessionStorage.hasAdminRights;
					})

				$scope.changeIssueStatus = function(issueId, newStatus) {
					issueServices.changeIssueStatus(issueId, newStatus.Id)
						.then(function(returnedStatuses) {
							$scope.issue.Status = newStatus;
							$scope.issue.AvailableStatuses = returnedStatuses;
						})
				}

				$scope.loadEditIssue = function(issueId) {
					var path = 'issues/' + issueId + '/edit/';
					$location.path(path);
				}
			}
		]);
})();