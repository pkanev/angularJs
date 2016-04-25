(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects', ['issueTrackingSystem.projects.projectServices'])
		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				isAuthenticated: ['$q', 'identity', function($q, identity) {
					if(identity.isAuthenticated()) {
						return $q.when(true);
					} else {
						return $q.reject('Unauthorized');
					}
				}],
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
				resolve: routeChecks.isAuthenticated
			});
			$routeProvider.when('/projects/:id', {
				templateUrl: 'app/projects/project-by-id.html',
				controller: 'ProjectByIdCtrl',
				resolve: routeChecks.isAuthenticated
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

		        $scope.reloadProjects = function() {
		            projectServices.getAllProjects($scope.projectsParams)
		            	.then(function (projects) {
		            		$scope.totalProjects = projects.length;
                            var start = ($scope.projectsParams['pageNumber']-1) * $scope.projectsParams['pageSize'];
                            var end = start + $scope.projectsParams['pageSize'];
                            var projectsPerPage = projects.slice(start, end);
		            		$scope.projectsPerPage = projectsPerPage;
		            		$scope.allProjects = projects;
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
			'projectServices',
			function($scope, $routeParams, projectServices) {
				projectServices.getProjectById($routeParams.id)
					.then(function(project) {
						$scope.project = project;
						console.log(project);
					});
					
				projectServices.getIssuesByProject($routeParams.id)
					.then(function(issues) {
						$scope.projectIssues = issues;
						console.log(issues);
					});
			}
		])
})();