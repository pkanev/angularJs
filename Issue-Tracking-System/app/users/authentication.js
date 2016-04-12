(function() {
	'use strict';

	angular.module('issueTrackingSystem.users.authentication', [])
		.factory('authentication', [
			'$http',
			'$q',
			'$httpParamSerializerJQLike',
			'BASE_URL',
			function($http, $q, $httpParamSerializerJQLike, BASE_URL) {
				function registerUser(user) {
					var deferred = $q.defer(),
						req = {
							method: 'POST',
						    url: BASE_URL + 'api/Account/Register',
						    data: $httpParamSerializerJQLike(user),
						    headers: {
						    	'Content-Type': 'application/x-www-form-urlencoded'
						    }
						};

					$http(req)
						.then(function(response) {
							deferred.resolve(response.data);
						}, function(error) {

						});
					return deferred.promise;
				}

				function loginUser(user) {
					var deferred = $q.defer(),
						req;

					user.grant_type='password';
					req = {
						method: 'POST',
					    url: BASE_URL + 'api/Token',
					    data: $httpParamSerializerJQLike(user),
					    headers: {
					    	'Content-Type': 'application/x-www-form-urlencoded'
					    }
					};

					$http(req)//.post(BASE_URL + 'api/Token', $httpParamSerializerJQLike(user))
						.then(function(response) {
							deferred.resolve(response.data);
						}, function(error) {

						});
					return deferred.promise;
				}

				function logout() {

				}


				return {
					registerUser: registerUser,
					loginUser: loginUser,
					logout: logout
				}
			}
		])
})();