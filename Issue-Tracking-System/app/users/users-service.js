(function() {
	'use strict';
	angular.module('issueTrackingSystem.users.userServices', [])
		.factory('userServices', [
			'$http',
			'$q',
			'BASE_URL',
			function($http, $q, BASE_URL) {
				function getAllUsers() {
					var deferred = $q.defer();

					$http.get(BASE_URL + 'users/')
						.then(function(response) {
							deferred.resolve(response.data);
						});

					return deferred.promise;
				}

				function makeAdmin(userId) {
					var deferred = $q.defer();

					$http.put(BASE_URL + 'users/makeadmin', userId)
						.then(function(response) {
							deferred.resolve(response);
						});

					return deferred.promise;
				}

				return {
					getAllUsers: getAllUsers,
					makeAdmin: makeAdmin
				}
			}
		]);
})();