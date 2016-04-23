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

			$routeProvider.when('/projects', {
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