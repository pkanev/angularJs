(function() {
	'use strict';
	angular.module('issueTrackingSystem.issues.my', ['issueTrackingSystem.issues.issueServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/issues/me', {
				templateUrl: 'app/issues/my/my-issues.html',
				controller: 'MyIssuesCtrl',
				access: {
					isAuthenticated: true
				}
			});
		}])
		.controller('MyIssuesCtrl', [
			'$scope',
			'$routeParams',
			'$location',
			'issueServices',
			'PAGE_SIZE',
			function($scope, $routeParams, $location, issueServices, PAGE_SIZE) {
				$scope.issuesParams = {
		        	'pageNumber' : 1,
					'pageSize' : PAGE_SIZE,
		        };
        		$scope.orderBy = $routeParams.orderBy || 'Project.Name desc, IssueKey';

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

		        $scope.loadProjectByIssue = function(projectId) {
		        	var path = '/projects/' + projectId;
		        	$location.path(path);
		        }
			}
		]);
})();