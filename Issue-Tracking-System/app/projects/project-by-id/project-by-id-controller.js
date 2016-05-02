(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects.byId', ['issueTrackingSystem.projects.projectServices', 'issueTrackingSystem.issues.issueServices'])
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

			$routeProvider.when('/projects/:id', {
				templateUrl: 'app/projects/project-by-id/project-by-id.html',
				controller: 'ProjectByIdCtrl',
				access: {
					isAdminOrLead: true
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
					});
					
				issueServices.getIssuesByProject($routeParams.id)
					.then(function(issues) {
						$scope.projectIssues = issues;
					}).then(function() {
						$scope.loadPagination();						
					});

				$scope.loadEditProject = function(projectId) {
					var path = '/projects/' + projectId + '/edit';
					$location.path(path);
				}

				$scope.loadAddIssue = function(projectId) {
					var path = 'projects/' + projectId + '/issues/add';
					$location.path(path);	
				}

				$scope.loadPagination = function() {
            		$scope.totalIssues = $scope.projectIssues.length;
                    var start = ($scope.issueParams['pageNumber']-1) * $scope.issueParams['pageSize'];
                    var end = start + $scope.issueParams['pageSize'];
                    var issuesPerPage = $scope.projectIssues.slice(start, end);
            		$scope.issuesPerPage = issuesPerPage;
            		$scope.allIssues = $scope.projectIssues;
		            
		        };

		        $scope.loadIssueById = function(issueId) {
		        	var path = '/issues/' + issueId;
					$location.path(path);
		        }
			}
		])
})();