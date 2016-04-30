(function() {
	'use strict';
	angular.module('issueTrackingSystem.issues.issueServices', [])
		.factory('issueServices', [
			'$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {
            	function getIssuesByProject(projectId) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'projects/' + projectId + '/issues')
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

            	return {
            		getIssuesByProject: getIssuesByProject,

            	}
            }
		])
})();