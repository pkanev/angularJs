(function() {
	'use strict';
	angular.module('issueTrackingSystem.users', ['issueTrackingSystem.users.userServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/users/', {
				templateUrl: 'app/users/users.html',
				controller: 'UsersCtrl',
				access: {
					isAdmin: true
				}
			});
		}])
		.controller('UsersCtrl', [
			'$scope',
			'$filter',
			'userServices',
			'PAGE_SIZE',
			function($scope, $filter, userServices, PAGE_SIZE) {
				$scope.userParams = {
		        	'pageNumber' : 1,
					'pageSize' : PAGE_SIZE,
		        };
				// $scope.filteredUsers = [];
				$scope.users = [];

				userServices.getAllUsers()
					.then(function(returnedUsers) {
						$scope.users = returnedUsers;
						$scope.filteredUsers = $filter('orderBy')($scope.users, 'Username');
						$scope.loadPagination();
					});

				$scope.$watch('filterCriteria', function(newVal, oldVal) {
					if(newVal) {
						$scope.filteredUsers = $filter('filter')($scope.users, newVal);
						$scope.filteredUsers = $filter('orderBy')($scope.filteredUsers, 'Username');
					} else {
						$scope.filteredUsers = $filter('orderBy')($scope.users, 'Username');
					}
					$scope.loadPagination();
				});

				$scope.loadPagination = function() {
            		$scope.totalUsers = $scope.filteredUsers.length;
                    var start = ($scope.userParams['pageNumber'] - 1) * $scope.userParams['pageSize'];
                    var end = start + $scope.userParams['pageSize'];
            		$scope.usersPerPage = $scope.filteredUsers.slice(start, end);
		        };

		        $scope.makeAdmin = function(user) {
		        	var data = {
		        		UserId: user.Id
		        	};

		        	userServices.makeAdmin(data)
		        		.then(function(success) {
		        			user.isAdmin = true;
		        		})
		        }
			}
		]);
})();