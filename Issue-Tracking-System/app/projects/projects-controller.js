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
			function($scope, projectCollection) {
				projectCollection.getAllProjects()
					.then(function(projects) {
						$scope.projects = projects;
					})
			}
		])
})();