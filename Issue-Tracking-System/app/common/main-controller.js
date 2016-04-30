(function() {
	'use strict';
	angular.module('issueTrackingSystem.common', [])
		.controller('MainCtrl', [
			'$rootScope',
			'$http',
			'authentication',
			'identity',
			'toastr',
			function($rootScope, $http, authentication, identity, toastr) {
				identity.getCurrentUser()
					.then(function(user) {
						$rootScope.currentUser = user;
						$rootScope.isAuthenticated = identity.isAuthenticated();
						$rootScope.isAdmin = user.isAdmin;
					})

				$rootScope.logout = function() {
					authentication.logout();
					toastr.info('You were logged out successfully.');
					$rootScope.isAuthenticated = false;
					$rootScope.isAdmin = false;
				}
			}]);	
})();
