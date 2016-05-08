(function () {
	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('issueTrackingSystem', [
	  'ngRoute',
	  'angular-loading-bar',
	  'ui.bootstrap.pagination',
	  'ipCookie',
	  'issueTrackingSystem.dashboard',
	  'issueTrackingSystem.users.identity',
	  'issueTrackingSystem.users',
	  'issueTrackingSystem.common',
	  'issueTrackingSystem.projects.add',
	  'issueTrackingSystem.projects',
	  'issueTrackingSystem.projects.byId',
	  'issueTrackingSystem.projects.edit',
	  'issueTrackingSystem.issues.add',
	  'issueTrackingSystem.issues.byId',
	  'issueTrackingSystem.issues.edit',
	  'issueTrackingSystem.issues.comments.byIssue',
	  'issueTrackingSystem.labels',
	  'issueTrackingSystem.profile.password'
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
							} else if (rejection.data && rejection.data.ModelState && rejection.data.ModelState['model.NewPassword']) {
								errors = rejection.data.ModelState['model.NewPassword'];
								if(errors.length > 0) {
									errors.forEach(function(err) {
										toastr.error(err);										
									})
								}
							} else {
								errors = rejection.data;
								if(errors && errors.hasOwnProperty('length') && errors.length > 0) {
									errors.forEach(function(err) {
										toastr.error(err);
									})
								} else {
									toastr.error('There was a problem loading the resource.');
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
		});
	}])
	.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
	.constant('PAGE_SIZE', 5)
	.constant('toastr', toastr);
})(); 
