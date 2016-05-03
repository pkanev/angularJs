(function() {
	'use strict';
	angular.module('issueTrackingSystem.common', [])
		.controller('MainCtrl', [
			'$scope',
			'$http',
			'authentication',
			'identity',
			'toastr',
			function($scope, $http, authentication, identity, toastr) {
				identity.getCurrentUser()
					.then(function(user) {
						$scope.currentUser = user;
						$scope.isAuthenticated = identity.isAuthenticated();
						$scope.isAdmin = user.isAdmin;
					})

				$scope.logout = function() {
					authentication.logout();
					toastr.info('You were logged out successfully.');
					$scope.isAuthenticated = false;
					$scope.isAdmin = false;
				}
			}]);	
})();
