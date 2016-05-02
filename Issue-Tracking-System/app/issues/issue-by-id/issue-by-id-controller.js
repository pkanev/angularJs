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
			'$rootScope',
			'$scope',
			'$routeParams',
			'$location',
			'issueServices',
			function($rootScope, $scope, $routeParams, $location, issueServices) {
				issueServices.getIssueById($routeParams.id)
					.then(function(currentIssue) {
						$scope.issue = currentIssue;
						if(currentIssue.Author.Id === $rootScope.currentUser.Id) {
							$scope.isLead = true;
						}
						if(currentIssue.Assignee.Id === $rootScope.currentUser.Id) {
							$scope.isAssignee = true;
						}
						$scope.isAdmin = $rootScope.currentUser.isAdmin;
					})

				$scope.changeIssueStatus = function(issueId, newStatus) {
					issueServices.changeIssueStatus(issueId, newStatus.Id)
						.then(function(returnedStatuses) {
							$scope.issue.Status = newStatus;
							$scope.issue.AvailableStatuses = returnedStatuses;
						})
				}
			}
		]);
})();