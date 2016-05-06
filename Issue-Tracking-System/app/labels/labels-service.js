(function() {
    'use strict';
    angular.module('issueTrackingSystem.labels.labelsServices',[])
        .factory('labelsServices', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {
                function getLabels(filter) {
                var deferred = $q.defer();

                    $http.get(BASE_URL + 'labels/?filter=' + filter)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                return {
                    getLabels: getLabels
                }
            }
        ]);
})();