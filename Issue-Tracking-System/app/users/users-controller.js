(function() {
	'use strict';
	angular.module('issueTrackingSystem.users', ['issueTrackingSystem.users.userServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/users/', {
				templateUrl: 'app/users/users.html',
				controller: 'UsersCtrl',
				access: {
					isAuthenticated: true
				}
			});
		}])
		.controller('UsersCtrl', [
			'$scope',
			'$location',
			'userServices',
			function($scope, $location, userServices) {
				userServices.getAllUsers()
					.then(function(returnedUsers) {
						$scope.users = returnedUsers;
					})
			}
		]);
})();