(function() {
	angular.module('issueTrackingSystem.users.identity', [])
		.factory('identity', [
			'$http',
			'$q',
			'$httpParamSerializerJQLike',
			'BASE_URL',
			function($http, $q, $httpParamSerializerJQLike, BASE_URL) {
				var deferred = $q.defer(),
					currentUser = undefined,
					accessToken,
					tokenType;

				$http.defaults.headers.common.Authorization = tokenType + ' ' + accessToken;

				$http.get(BASE_URL + 'users/me')
					.then(function(response) {
						currentUser = response.data;
						deferred.resolve(currentUser);
					});


				return {
					getToken: function(user) {
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
								accessToken = response.data.access_token;
								tokenType = response.data.token_type;
								sessionStorage['currentUser'] = JSON.stringify(response.data);
								deferred.resolve(response.data);
								console.log(accessToken);
								console.log(tokenType);
							}, function(error) {

							});
						return deferred.promise;
					},
					getCurrentUser: function () {
						if(currentUser) {
							return $q.when(currentUser); //wraps in a promise
						} else {
							return deferred.promise;
						}
					},
					isAuthenticated: function() {
						return sessionStorage['currentUser'] != undefined;
					},
					isAdmin: function() {
						return true;
					}
				};

			}
		])
})();