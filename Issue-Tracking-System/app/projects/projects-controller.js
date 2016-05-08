(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects', ['issueTrackingSystem.projects.projectServices', 'issueTrackingSystem.issues.issueServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/projects/', {
				templateUrl: 'app/projects/projects.html',
				controller: 'ProjectsCtrl',
				access: {
					isAdmin: true
				}
			});
		}])
		.controller('ProjectsCtrl', [
			'$scope',
			'$location',
			'projectServices',
			'issueServices',
			'PAGE_SIZE',
			function($scope, $location, projectServices, issueServices, PAGE_SIZE) {
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
			}
		]);
})();