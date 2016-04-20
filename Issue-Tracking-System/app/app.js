(function () {
	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('issueTrackingSystem', [
	  'ngRoute',
	  'ngCookies',
	  'angular-loading-bar',
	  'ui.bootstrap.pagination',
	  'issueTrackingSystem.home',
	  'issueTrackingSystem.users.identity',
	  'issueTrackingSystem.common',
	  'issueTrackingSystem.projects'
	])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/'});
	}])
	.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
	.constant('PAGE_SIZE', 10);
})(); 
