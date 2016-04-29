(function() {
	angular.module('issueTrackingSystem.users.identity', ['issueTrackingSystem.projects.projectServices'])
		.factory('identity', [
			'$http',
			'$q',
			'$httpParamSerializerJQLike',
			'$routeParams',
			'ipCookie',
			'projectServices',
			'BASE_URL',
			function($http, $q, $httpParamSerializerJQLike, $routeParams, ipCookie, projectServices, BASE_URL) {
				var deferred = $q.defer(),
					currentUser = undefined,
					AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';

				function preserveUserData(data) {
					var accessToken = data.access_token;
					var tokenType = data.token_type;
					var daysToExpire = Math.ceil(parseFloat(data.expires_in)/60/60/24);
					$http.defaults.headers.common.Authorization = tokenType + ' ' + accessToken;
					ipCookie(AUTHENTICATION_COOKIE_KEY, accessToken, {
						expires: daysToExpire});
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
							
							// deferred.resolve(response);
						});
					return deferred.promise;
				}

				function removeToken () {
					ipCookie.remove(AUTHENTICATION_COOKIE_KEY);
				}

				function clearHeaders() {
					$http.defaults.headers.common.Authorization = undefined;
				}

				function refreshCookie() {
					if (isAuthenticated()) {
						$http.defaults.headers.common.Authorization = 'Bearer ' + ipCookie(AUTHENTICATION_COOKIE_KEY);
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
					return !!ipCookie(AUTHENTICATION_COOKIE_KEY);
				}

				function isAdmin() {
					if(currentUser && currentUser.isAdmin) {
						return true;
					}
				}

				function isOwner(projectId) {
					var deferredOwner = $q.defer();
					projectServices.getProjectById(projectId)
						.then(function(returnedProject) {
							if (currentUser && (returnedProject.Lead.Id === currentUser.Id)) {
								deferredOwner.resolve(true);
							} else {
								deferredOwner.resolve(false);
							}
						});
					return deferredOwner.promise;
				}

				function checkAuthentication(condition) {
					var deferredStatus = $q.defer();
					if(condition.isAuthenticated) {
						if(isAuthenticated()) {
							deferredStatus.resolve({isAccessible: true});
						} else {
							deferredStatus.resolve({isAccessible: false});
						}
					} else if (condition.isAdmin){
						if(isAdmin()) {
							deferredStatus.resolve({isAccessible: true});
						} else {
							deferredStatus.resolve({isAccessible: false});
						}
					} else if (condition.isAdminOrLead) {
						if(isAdmin()) {
							deferredStatus.resolve({isAccessible: true});
						} else {
							isOwner($routeParams.id)
								.then(function(isAllowed) {
									if(isAllowed) {
										deferredStatus.resolve({isAccessible: true});
									} else {
										deferredStatus.resolve({isAccessible: false});
									} 
								})
						}
					}

					return deferredStatus.promise;
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
					isAdmin: isAdmin,
					isOwner: isOwner,
					checkAuthentication: checkAuthentication
				};

			}
		])
})();