(function () {
	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('issueTrackingSystem', [
	  'ngRoute',
	  'angular-loading-bar',
	  'ui.bootstrap.pagination',
	  'ipCookie',
	  'issueTrackingSystem.home',
	  'issueTrackingSystem.users.identity',
	  'issueTrackingSystem.common',
	  'issueTrackingSystem.projects'
	])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/'});
	}])
	.run(['$rootScope', '$location', 'identity', function($rootScope, $location, identity) {
		$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
			if (rejection == 'Unauthorized') {
				$location.path('/');
			}

		});
		$rootScope.$on("$routeChangeSuccess", function(ev){
			identity.refreshCookie();
			if(identity.isAuthenticated()) {
				identity.getCurrentUser()
					.then(function(user) {
						$rootScope.currentUser = user;
						$rootScope.isAuthenticated = true;
						$rootScope.isAdmin = user.isAdmin;
				})
			}
		});

	}])
	.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
	.constant('PAGE_SIZE', 5);
})(); 
