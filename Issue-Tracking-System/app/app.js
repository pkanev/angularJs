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
	  'issueTrackingSystem.projects.create',
	  'issueTrackingSystem.projects',
	  'issueTrackingSystem.projects.edit'
	])
	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
		$routeProvider.otherwise({redirectTo: '/'});
		$httpProvider.interceptors.push(['$q', 'toastr', function($q, toastr) {
					return {
						'response': function(response) {
							// breaks loading bar
							// if (response.data) {
							// 	return response.data;
							// }

							return response;
						},
						'responseError': function(rejection) {
							var errors = {};
							if (rejection.data && rejection.data['error_description']) {
								toastr.error(rejection.data['error_description']);
							} else if (rejection.data && rejection.data.ModelState && rejection.data.ModelState['model.Password']) {
								errors = rejection.data.ModelState;
								if (errors['model.Password'] && errors['model.Password'].length > 0) {
									toastr.error(errors['model.Password'][0]);
								}
							} else if (rejection.data && rejection.data.ModelState && rejection.data.ModelState['']) {
								errors = rejection.data.ModelState[''];
								if(errors.length > 0) {
									errors.forEach(function(err) {
										toastr.error(err);										
									})
								}
							}

							return $q.reject(rejection);
						}
					}
			  }]);
	}])
	.run(['$rootScope', '$location', 'identity', function($rootScope, $location, identity) {
		$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
			if (rejection == 'Unauthorized') {
				toastr.error('You are not authorized to visit this page.');
				$location.path('/');
			}

		});
		$rootScope.$on("$routeChangeSuccess", function(ev, current, previous){
			identity.refreshCookie();
			if(current.access) {
				identity.checkAuthentication(current.access)
					.then(function(response) {
						if(response && !response.isAccessible)
						{
							toastr.error('You are not authorized to visit this page.');
							$location.path(previous || '/');
						}
					})
			}

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
	.constant('PAGE_SIZE', 5)
	.constant('toastr', toastr);
})(); 
