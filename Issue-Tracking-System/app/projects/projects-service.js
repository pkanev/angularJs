(function() {
    'use strict';
    angular.module('issueTrackingSystem.projects.projectServices', [])
        .factory('projectServices', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {
                function getAllProjects(params, filter) {                
                    var deferred = $q.defer();
                    
                    $http.get(BASE_URL + 'projects/?filter=' + filter, {params: params})
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });
                    
                    return deferred.promise;
                }

                function getProjectById(projectId){
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'projects/' + projectId)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }
                
                function getIssuesByProject(projectId) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'projects/' + projectId + '/issues')
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                function editProject(id, projectData) {
                    var deferred = $q.defer();
                    $http.put(BASE_URL + 'projects/' + id, projectData)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                function createProjectKey(projectName) {
                    projectName = projectName || '';
                    var nameList = projectName.split(/\s+/);
                    var key ='';
                    nameList.forEach(function(name) {
                        key += name.substring(0,1);
                    });

                    return key;
                }

                function createProject(project) {
                    var deferred = $q.defer();
                    $http.post(BASE_URL + 'projects', project)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                return {
                    getAllProjects: getAllProjects,
                    getProjectById: getProjectById,
                    getIssuesByProject: getIssuesByProject,
                    editProject: editProject,
                    createProjectKey: createProjectKey,
                    createProject: createProject
                }
            }
        ]);   
})();
