(function() {
	angular.module('issueTrackingSystem.users.identity', [])
		.factory('identity', [
			'$http',
			'$q',
			'$httpParamSerializerJQLike',
			'$cookies',
			'BASE_URL',
			function($http, $q, $httpParamSerializerJQLike, $cookies, BASE_URL) {
				var deferred = $q.defer(),
					currentUser = undefined,
					AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';

				function preserveUserData(data) {
					console.log(data);
					var accessToken = data.access_token;
					var tokenType = data.token_type;
					$http.defaults.headers.common.Authorization = tokenType + ' ' + accessToken;
					$cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken, [{expires: data['.expires'], path:'/projects'}]);
				}

				function getCurrentUser() {
					if (currentUser) {
						return $q.when(currentUser);
					} else {
						return deferred.promise;
					}
				}

				function getToken(user) {
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

					$http(req)
						.then(function(response) {
							preserveUserData(response.data);
							
							requestUserProfile()
								.then(function() {
									deferred.resolve(response.data);
								});
							
							// deferred.resolve(response.data);
						});
					return deferred.promise;
				}

				function removeToken () {
					$cookies.remove(AUTHENTICATION_COOKIE_KEY);
				}

				function clearHeaders() {
					$http.defaults.headers.common.Authorization = undefined;
				}

				function refreshCookie() {
					if (isAuthenticated()) {
						$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
						requestUserProfile();
					}
				}

				function requestUserProfile() {
					var userProfileDeferred = $q.defer();

					$http.get(BASE_URL + 'users/me')
						.then(function(response) {
							currentUser = response.data;
							deferred.resolve(currentUser);
							userProfileDeferred.resolve();
						});

					return userProfileDeferred.promise;
				}

				function removeUserProfile() {
					currentUser = undefined;
				}

				function isAuthenticated() {
					return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
				}

				return {
					getCurrentUser: getCurrentUser,
					getToken: getToken,
					removeToken: removeToken,
					clearHeaders: clearHeaders,
					refreshCookie: refreshCookie,
					requestUserProfile: requestUserProfile,
					removeUserProfile: removeUserProfile,
					isAuthenticated: isAuthenticated,
					isAdmin: function() {
						return true;
					}
				};

			}
		])
})();