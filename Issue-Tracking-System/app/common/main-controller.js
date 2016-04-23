(function() {
	'use strict';
	angular.module('issueTrackingSystem.common', [])
		.controller('MainCtrl', [
			'$rootScope',
			'$http',
			'authentication',
			'identity',
			function($rootScope, $http, authentication, identity) {
				identity.getCurrentUser()
					.then(function(user) {
						$rootScope.currentUser = user;
						$rootScope.isAuthenticated = true;
						$rootScope.isAdmin = user.isAdmin;
					})

				$rootScope.logout = function() {
					authentication.logout();
					$rootScope.isAuthenticated = false;
					$rootScope.isAdmin = false;
				}
			}]);	
})();
