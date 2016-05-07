(function() {
	'use strict';
	angular.module('issueTrackingSystem.labels', ['issueTrackingSystem.labels.labelsServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/labels/', {
				templateUrl: 'app/labels/labels.html',
				controller: 'LabelsCtrl',
				access: {
					isAuthenticated: true
				}
			});
			$routeProvider.when('/labels/?filter={filter}', {
				templateUrl: 'app/labels/labels.html',
				controller: 'LabelsCtrl',
				access: {
					isAuthenticated: true
				}
			});
		}])
		.controller('LabelsCtrl', [
			'$scope',
			'$filter',
			'$routeParams',
			'labelsServices',
			'PAGE_SIZE',
			'toastr',
			function($scope, $filter, $routeParams, labelsServices, PAGE_SIZE, toastr) {
				$scope.labelParams = {
		        	'pageNumber' : 1,
					'pageSize' : PAGE_SIZE,
		        };
				$scope.labels = [];
				$scope.filterCriteria = $routeParams.filter || '';

				$scope.getLabelsByFilter = function (advancedFilterCriteria) {
					labelsServices.getLabels(advancedFilterCriteria)
					.then(function(returnedLabels) {
						$scope.labels = returnedLabels;
						$scope.filteredLabels = $filter('orderBy')($scope.labels, 'Id');
						$scope.loadPagination();
					});
				};

				labelsServices.getLabels($scope.filterCriteria)
					.then(function(returnedLabels) {
						$scope.labels = returnedLabels;
						$scope.filteredLabels = $filter('orderBy')($scope.labels, 'Id');
						$scope.loadPagination();
					});

				$scope.$watch('filterCriteria', function(newVal, oldVal) {
					if(newVal) {
						$scope.filteredLabels = $filter('filter')($scope.labels, newVal);
						$scope.filteredLabels = $filter('orderBy')($scope.filteredLabels, 'Id');
					} else {
						$scope.filteredLabels = $filter('orderBy')($scope.labels, 'Id');
					}
					$scope.loadPagination();
				});

				$scope.loadPagination = function() {
            		$scope.totalLabels = $scope.filteredLabels.length;
                    var start = ($scope.labelParams['pageNumber'] - 1) * $scope.labelParams['pageSize'];
                    var end = start + $scope.labelParams['pageSize'];
            		$scope.labelsPerPage = $scope.filteredLabels.slice(start, end);
		        };

			}
		]);
})();