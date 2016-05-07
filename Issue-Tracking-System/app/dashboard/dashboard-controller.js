(function () {
	'use strict';
	angular.module('issueTrackingSystem.dashboard', ['issueTrackingSystem.users.authentication', 'issueTrackingSystem.projects.projectServices', 'issueTrackingSystem.issues.issueServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'app/dashboard/dashboard.html',
				controller: 'DashboardCtrl'
			});
		}])
		.controller('DashboardCtrl', [
			'$scope',
			'$location',
			'$routeParams',
			'authentication',
			'identity',
			'projectServices',
			'issueServices',
			'PAGE_SIZE',
			'toastr',
			function($scope, $location, $routeParams, authentication, identity, projectServices, issueServices, PAGE_SIZE, toastr) {

				$scope.isAuthenticated = identity.isAuthenticated();
				$scope.isAdmin = identity.isAdmin();
				identity.getCurrentUser()
					.then(function(user) {
						$scope.currentUser = user;
					});

				$scope.login = function(user) {
					authentication.loginUser(user)
						.then(function(loggedInUser) {
							toastr.info('Welcome, ' + loggedInUser.userName);
							$scope.currentUser = loggedInUser;
							$scope.isAuthenticated = identity.isAuthenticated();
							$scope.isAdmin = identity.isAdmin();
							$location.path('/fakepath');
						})
				};

				$scope.register = function(user) {
				authentication.registerUser(user)
					.then(function(registeredUser) {
						toastr.info('Successful registration');
						var userToLogin = {
							Username: user.email,
							Password: user.password
						};
						$scope.login(userToLogin);
					});
				};

				if($scope.isAuthenticated) {
	        		$scope.orderBy = $routeParams.orderBy || 'DueDate desc';

					var projectParams = {
			        	'pageNumber' : 1,
						'pageSize' : 999,
			        };
			        var affiliatedProjectsFilter = 'Lead.Id="' + sessionStorage['id'] + '"';
			        var affiliatedProjects = {};
			        $scope.affiliatedProjects = [];

					projectServices.getAllProjects(projectParams, affiliatedProjectsFilter)
						.then(function(data) {
							data.Projects.forEach(function(project) {
								affiliatedProjects[project.Id] = project.Name;
							});

							issueServices.getMyIssues(projectParams, $scope.orderBy)
								.then(function(data) {
									data.Issues.forEach(function(issue) {
										affiliatedProjects[issue.Project.Id] = issue.Project.Name;
									});

									for (var id in affiliatedProjects) {
										$scope.affiliatedProjects.push({
											Id: id,
											Name: affiliatedProjects[id]
										});
									}
								})

						});

					$scope.issuesParams = {
			        	'pageNumber' : 1,
						'pageSize' : PAGE_SIZE,
			        };


	        		$scope.reloadIssues = function() {
			            issueServices.getMyIssues($scope.issuesParams, $scope.orderBy)
			            	.then(function (data) {
			            		$scope.totalIssues = data.TotalCount;
	                            $scope.issuesPerPage = data.Issues;
			            	})
			        };

			        $scope.reloadIssues();					
				}

			}
		])
	
})(); 
