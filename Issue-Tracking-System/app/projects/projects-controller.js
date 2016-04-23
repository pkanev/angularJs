(function() {
	'use strict';
	angular.module('issueTrackingSystem.projects', ['issueTrackingSystem.projects.projectCollection'])
		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				authenticated: ['$q', 'identity', function($q, identity) {
					if(identity.isAuthenticated()) {
						return $q.when(true);
					} else {
						return $q.reject('Unauthorized');
					}
				}]
			};

			$routeProvider.when('/projects/', {
				templateUrl: 'app/projects/projects.html',
				controller: 'ProjectsCtrl',
				resolve: routeChecks.authenticated
			});
		}])
		.controller('ProjectsCtrl', [
			'$scope',
			'projectCollection',
			'PAGE_SIZE',
			function($scope, projectCollection, PAGE_SIZE) {
				$scope.projectsParams = {
		        	'pageNumber' : 1,
					'pageSize' : PAGE_SIZE,
		        };

		        $scope.reloadProjects = function() {
		            projectCollection.getAllProjects($scope.projectsParams)
		            	.then(function (projects) {
		            		$scope.totalProjects = projects.length;
                            var start = ($scope.projectsParams['pageNumber']-1) * $scope.projectsParams['pageSize'];
                            var end = start + $scope.projectsParams['pageSize'];
                            var result = projects.slice(start, end);
		            		$scope.projects = result;
		            	})
		        };

		        $scope.reloadProjects();
			}
		])
})();