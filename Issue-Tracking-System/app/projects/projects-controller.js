(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects', ['issueTrackingSystem.projects.projectServices'])
		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				isAdmin: ['$q', 'identity', function($q, identity) {
					if(identity.isAdmin()) {
						return $q.when(true);
					} else {
						return $q.reject('Unauthorized');
					}
				}]
			};

			$routeProvider.when('/projects/', {
				templateUrl: 'app/projects/projects.html',
				controller: 'ProjectsCtrl',
				resolve: routeChecks.isAdmin
			});
			$routeProvider.when('/projects/:id', {
				templateUrl: 'app/projects/project-by-id.html',
				controller: 'ProjectByIdCtrl',
				resolve: routeChecks.isAdmin
			});
		}])
		.controller('ProjectsCtrl', [
			'$scope',
			'$location',
			'projectServices',
			'PAGE_SIZE',
			function($scope, $location, projectServices, PAGE_SIZE) {
				$scope.projectsParams = {
		        	'pageNumber' : 1,
					'pageSize' : PAGE_SIZE,
		        };
        		$scope.criteria = 'none';
        		$scope.filter = $scope.filter || '';

		        $scope.reloadProjects = function() {
		            projectServices.getAllProjects($scope.projectsParams, $scope.filter)
		            	.then(function (projects) {
		            		$scope.totalProjects = projects.TotalCount;
                            $scope.projectsPerPage = projects.Projects;
		            	})
		        };

		        $scope.reloadProjects();

		        $scope.loadProjectById = function(projectId){
        			var path = '/projects/' + projectId;
        			$location.path(path);
		        };
			}
		])
		.controller('ProjectByIdCtrl', [
			'$scope',
			'$routeParams',
			'$location',
			'projectServices',
			'PAGE_SIZE',
			function($scope, $routeParams, $location, projectServices, PAGE_SIZE) {
				$scope.issueParams = {
		        	'pageNumber' : 1,
					'pageSize' : PAGE_SIZE,
		        };

				projectServices.getProjectById($routeParams.id)
					.then(function(project) {
						$scope.project = project;
					});
					
				projectServices.getIssuesByProject($routeParams.id)
					.then(function(issues) {
						$scope.projectIssues = issues;
					}).then(function() {
						$scope.loadPagination();						
					});

				$scope.loadEditProcect = function(projectId) {
					var path = '/projects/' + projectId + '/edit';
					$location.path(path);
				}

				$scope.loadAddProject = function() {
					var path = '/projects/add';
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
			}
		])
})();