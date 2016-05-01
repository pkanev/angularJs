(function() {
	'use strict';
	angular.module('issueTrackingSystem.issues.read', ['issueTrackingSystem.issues.issueServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/issues/me', {
				templateUrl: 'app/issues/read/my-issues.html',
				controller: 'MyIssuesCtrl',
				access: {
					isAuthenticated: true
				}
				// resolve: routeChecks.isAdmin
			});
		}])
		.controller('MyIssuesCtrl', [
			'$scope',
			'$location',
			'issueServices',
			'PAGE_SIZE',
			function($scope, $location, issueServices, PAGE_SIZE) {
				$scope.issuesParams = {
		        	'pageNumber' : 1,
					'pageSize' : PAGE_SIZE,
		        };
        		$scope.orderBy = $scope.orderBy || 'Project.Name desc, IssueKey';

        		$scope.reloadIssues = function() {
		            issueServices.getMyIssues($scope.issuesParams, $scope.orderBy)
		            	.then(function (issues) {
		            		$scope.totalIssues = issues.TotalCount;
                            $scope.issuesPerPage = issues.Issues;
		            	})
		        };

		        $scope.reloadIssues();

		        $scope.loadIssueById = function(issueId) {
		        	var path = '/issues/' + issueId;
		        	$location.path(path);
		        }

		        $scope.loadProjectIssues = function(projectId) {
		        	var path = '/projects/' + projectId + '/Issues/';
		        	$location.path(path);
		        }
			}
		]);
})();