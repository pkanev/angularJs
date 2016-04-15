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
					accessToken = '2_8AEZ9E_K13k1m3yHqt71qmAoL1Uef0_oL8IMcG_v4GzN-9mxmrGJ9dXG8EUf3DVT7nXFtDTJTmWk7Adqe3HmhhC6wzIIM6hFI4vRBapQy-DBUxKffaxFStKgXo8MKQP_j0oN51kwpSYLeC_ee4I4ifLKcpT_ymftO9ZwvWvsgKhhGJXlk5LjLtCCbrn_y5zDYNY23VeKGc2XUnX9s3N0yWPwWQvfAvh1Ih31X_QbH0eiGy67slMWMp8qV6Vv-__PwAYVO-5e3yF5oK6yrsiEmLqhf1pG2XAwZZ580jiD7xNv_xqs-wsfzPoSI9aHm4P_0cpBYXeQmjg4UEKU2UsQk04LtusdJqJR2K91dsCD_qEditpyQ79Xk1iwOsdwTd9yeDlwjabqrj0PDbNWGKfy6_C6-5TLtpj1GGm-wB8ZEJSwo84jFdb7iWOR20PnhrYEePeAtHFMgMm93AoTwyur0HWKWEJ8MDqkOSS0Q0EwA';

				$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

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
								deferred.resolve(response.data);
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
						return true;
					},
					isAdmin: function() {
						return true;
					}
				};

			}
		])
})();