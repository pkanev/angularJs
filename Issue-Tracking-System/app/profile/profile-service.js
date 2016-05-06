(function() {    
	'use strict';
	angular.module('issueTrackingSystem.profile.profileServices',[])
		.factory('profileServices', [
			'$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) { 
                function changePassword(data) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'api/Account/ChangePassword', data)
                        .then(function(success) {
                            deferred.resolve(success);
                        });

                    return deferred.promise;
                }

                return {
                changePassword: changePassword
                }
            }
    	]);
})();