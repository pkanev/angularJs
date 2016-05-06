(function() {
	'use strict';
	angular.module('issueTrackingSystem.profile.password', ['issueTrackingSystem.profile.profileServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/profile/password', {
				templateUrl: 'app/profile/password/change-password.html',
				controller: 'ChangePasswordCtrl',
				access: {
					isAuthenticated: true
				}
			});
		}])
		.controller('ChangePasswordCtrl', [
			'$scope',
			'$location',
			'profileServices',
			'toastr',
			function($scope, $location, profileServices, toastr) {
				$scope.changePassword = function(passwordData) {
					profileServices.changePassword(passwordData)
						.then(function(success) {
							toastr.success('Password changed successfully');
							$location.path('/');
						})
				};
			}
		]);
})();