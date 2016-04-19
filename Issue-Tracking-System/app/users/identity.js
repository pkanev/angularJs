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
					accessToken ='hnxrr002b0G8UiL8yRwUep-G84EjHOYD_grPZydDaiV0hEMk61ZQLoX_jvd2xWflEU0VY99ZVH0_XtG58vLF5czjjGVIhKj9p13B5RQgDQzzHteV65IcWR6lT9dnxpCBK8fISc8iZ6Md6YBs1FqiJlViKgLl7SPuVSH1KHFSYjshOaiuG8Fl92L3uDOsLXBFgtmhETLeOc2pxDtfmXYxrLEdlD0x8n6rO4oRsELiJUPfpUfAjBhKZMb6HR3qGju8gtM0sNNIkFd5JHJRPZFVUFtcf2quxNz5Qlabe-AT0x_WNtj0Yp2D98duTm-2zEj-QEN3GBapkgSR2RESJNCsI00lfp-0BoBQ7HUqYC65dUQb2yAh9boDSyDuhJiGlQdZahglzovWkVe7MruS8PlPDiJMiAF1KDsQAFjx7N9cI3ppBiBAv6JnMGYkX1UsGBi8uRU5koaHTQxAPMCZlORQ85ALZys1bWehtyFlH39Zo6E',
					tokenType = 'Bearer ';

				$http.defaults.headers.common.Authorization = tokenType + accessToken;

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
								// $cookies.put('issueTrackingSystem.accessToken', response.data.access_token, {
								// 	 	expires: response.data['.issued']
								// 	 });

								//console.log($cookies.get('issueTrackingSystem.accessToken'));
								// console.log(BASE_URL);
								// console.log(response.data['.issued']);

								accessToken = response.data.access_token;
								tokenType = response.data.token_type;
								sessionStorage['currentUser'] = JSON.stringify(response.data);
								deferred.resolve(response.data);
								// console.log(accessToken);
								// console.log(tokenType);
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