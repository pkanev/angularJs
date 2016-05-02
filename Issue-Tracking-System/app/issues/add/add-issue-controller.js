(function () {
	'use strict';
	angular.module('issueTrackingSystem.issues.add', [])
		.config(['$routeProvider', function($routeProvider){
			$routeProvider.when('/issues/add', {
				templateUrl: 'app/issues/add/add-issue.html',
				controller: 'AddIssueCtrl',
				access: {
					isAdmin: true
				}
			});
		}])
		.controller('AddIssueCtrl', [
			'$scope',
			'$location',
			'projectServices',
			'issueServices',
			'userServices',
			'toastr',
			function($scope, $location, projectServices, issueServices, userServices, toastr) {
				
			}
		]);
})();