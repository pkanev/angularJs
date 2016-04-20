(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects', ['issueTrackingSystem.projects.projectCollection'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/projects', {
				templateUrl: 'app/projects/projects.html',
				controller: 'ProjectsCtrl'
			});
		}])
		.controller('ProjectsCtrl', [
			'$scope',
			'projectCollection',
			'PAGE_SIZE',
			function($scope, projectCollection, PAGE_SIZE) {
				$scope.projectsParams = {
		        	'startPage' : 1,
					'pageSize' : PAGE_SIZE
		        };

		        $scope.reloadProjects = function() {
		            projectCollection.getAllProjects($scope.projectsParams)
		            	.then(function (projects) {
		            		$scope.projects = projects;
		            	})
		        };

		        $scope.reloadProjects();
			}
		])
})();