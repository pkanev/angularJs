(function() {
    'use strict';
    angular.module('issueTrackingSystem.projects.projectCollection', [])
        .factory('projectCollection', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {
                function getAllProjects(params) {                
                    var deferred = $q.defer();
                    
                    $http.get(BASE_URL + 'projects', {params: params})
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });
                    
                    return deferred.promise;
                }
                
                return {
                    getAllProjects: getAllProjects
                }
        }]);    
})();
