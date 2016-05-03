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

                function getMyIssues(params, orderBy) {
                    var deferred = $q.defer();
                    
                    $http.get(BASE_URL + 'issues/me?orderBy=' + orderBy, {params: params})
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });
                    
                    return deferred.promise;
                }

                function getIssueById(issueId) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'issues/' + issueId)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                function addIssue(issue) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'issues/', issue)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                function editIssue(issue) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'issues/' + issue.Id, issue)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                function changeIssueStatus(issueId, statusId) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + statusId, {})
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

            	return {
            		getIssuesByProject: getIssuesByProject,
                    getMyIssues: getMyIssues,
                    getIssueById: getIssueById,
                    addIssue: addIssue,
                    editIssue: editIssue,
                    changeIssueStatus: changeIssueStatus
            	}
            }
		])
})();