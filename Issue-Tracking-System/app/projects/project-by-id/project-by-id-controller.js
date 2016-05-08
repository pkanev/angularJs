(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects.byId', ['issueTrackingSystem.projects.projectServices', 'issueTrackingSystem.issues.issueServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/projects/:id', {
				templateUrl: 'app/projects/project-by-id/project-by-id.html',
				controller: 'ProjectByIdCtrl',
				access: {
					isAuthenticated: true
				}
			});
		}])
		.controller('ProjectByIdCtrl', [
			'$scope',
			'$routeParams',
			'$location',
			'projectServices',
			'issueServices',
			'PAGE_SIZE',
			function($scope, $routeParams, $location, projectServices, issueServices, PAGE_SIZE) {
				$scope.issueParams = {
		        	'pageNumber' : 1,
					'pageSize' : PAGE_SIZE,
		        };

				projectServices.getProjectById($routeParams.id)
					.then(function(project) {
						$scope.project = project;

						if(project.Lead.Id === sessionStorage.id) {
							$scope.isLead = true;
						}
				
						$scope.isAdmin = sessionStorage.hasAdminRights;
					});
					
				issueServices.getIssuesByProject($routeParams.id)
					.then(function(issues) {
						$scope.projectIssues = issues;
					}).then(function() {
						$scope.loadPagination();						
					});

				$scope.loadPagination = function() {
            		$scope.totalIssues = $scope.projectIssues.length;
                    var start = ($scope.issueParams['pageNumber']-1) * $scope.issueParams['pageSize'];
                    var end = start + $scope.issueParams['pageSize'];
                    var issuesPerPage = $scope.projectIssues.slice(start, end);
            		$scope.issuesPerPage = issuesPerPage;
            		$scope.allIssues = $scope.projectIssues;
		            
		        };
			}
		])
})();