(function() {
	'use strict';

	angular.module('issueTrackingSystem.users.authentication', [])
		.factory('authentication', [
			'$http',
			'$q',
			'$httpParamSerializerJQLike',
			'$location',
			'identity',
			'BASE_URL',
			function($http, $q, $httpParamSerializerJQLike, $location, identity, BASE_URL) {
				function registerUser(user) {
					var deferred = $q.defer();
					var req = {
							method: 'POST',
						    url: BASE_URL + 'api/Account/Register',
						    data: $httpParamSerializerJQLike(user),
						    headers: {
						    	'Content-Type': 'application/x-www-form-urlencoded'
						    }
						};

					$http(req)
						.then(function(success) {
							deferred.resolve(success);
						});
						
					return deferred.promise;
				}

				function loginUser(user) {
					var deferred = $q.defer();

					identity.getToken(user)
						.then(function(token) {
							deferred.resolve(token);
						});

					return deferred.promise;
				}

				function logout() {
					identity.removeToken();
					identity.clearHeaders();
					identity.removeUserProfile();
					$location.path('/');
				}


				return {
					registerUser: registerUser,
					loginUser: loginUser,
					logout: logout
				}
			}
		])
})();