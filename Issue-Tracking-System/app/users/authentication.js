(function() {
	'use strict';

	angular.module('issueTrackingSystem.users.authentication', [])
		.factory('authentication', [
			'$http',
			'$q',
			'$httpParamSerializerJQLike',
			'identity',
			'BASE_URL',
			function($http, $q, $httpParamSerializerJQLike, identity, BASE_URL) {
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
							//should automatically login user
							deferred.resolve(identity.getToken(user));
						}, function(error) {

						});
					return deferred.promise;
				}

				function loginUser(user) {
					var deferred = $q.defer();

					identity.getToken(user)
						.then(function(response) {
							deferred.resolve(response);
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