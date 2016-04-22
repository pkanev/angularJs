(function() {
	'use strict';
	angular.module('issueTrackingSystem.common', [])
		.controller('MainCtrl', [
			'$scope',
			'$http',
			'identity',
			function($scope, $http, identity) {
				identity.getCurrentUser()
					.then(function(user) {
						$scope.currentUser = user;
						$scope.isAuthenticated = true;
					})

				$scope.isAdmin = identity.isAdmin();

				// if($scope.isAuthenticated) {
				// 	identity.requestUserProfile();
				// }

			}]);	
})();
