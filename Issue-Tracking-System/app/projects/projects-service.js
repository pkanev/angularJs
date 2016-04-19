angular.module('issueTrackingSystem.projects.projectCollection', [])
    .factory('projectCollection', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {
            function getAllProjects() {                
                var deferred = $q.defer();
                
                $http.get(BASE_URL + 'projects')
                    .then(function(response) {
                        deferred.resolve(response.data);
                    });
                
                return deferred.promise;
            }
            
            return {
                getAllProjects: getAllProjects
            }
    }]);