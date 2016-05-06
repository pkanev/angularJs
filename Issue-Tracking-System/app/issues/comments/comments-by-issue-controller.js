(function() {
	'use strict';
	angular.module('issueTrackingSystem.issues.comments.byIssue', ['issueTrackingSystem.issues.issueServices', 'issueTrackingSystem.projects.projectServices'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/issues/:id/comments', {
				templateUrl: 'app/issues/comments/comments-by-issue.html',
				controller: 'CommentsByIssueCtrl',
				access: {
					isAuthenticated: true
				}
			});
		}])
		.controller('CommentsByIssueCtrl', [
			'$scope',
			'$routeParams',
			'issueServices',
			'projectServices',
			function($scope, $routeParams, issueServices, projectServices) {
				$scope.issueId = $routeParams.id;
				$scope.canPost = false;
				$scope.commentToAdd = {
					Text: ''
				}

				issueServices.getCommentsByIssueId($scope.issueId)
					.then(function(returnedComments) {
						$scope.comments = returnedComments;
						if(returnedComments.length === 0) {
							$scope.noComments = true;
						}
						
						issueServices.getIssueById($routeParams.id)
	                        .then(function(returnedIssue) {
	                            var projectId = returnedIssue.Project.Id;
	                            projectServices.getProjectById(projectId)
	                            	.then(function(returnedProject) {
	                            		if(returnedProject.Lead.Id === sessionStorage['id']) {
	                            			$scope.canPost = true;
	                            			return;
	                            		}

	                            		if(!$scope.canPost) {
	                            			issueServices.getIssuesByProject(projectId)
	                            				.then(function(returnedIssues) {
	                            					returnedIssues.every(function(issue) {
	                            						if(issue.Assignee.Id === sessionStorage['id']) {
	                            							$scope.canPost = true;
	                            							return false;
	                            						} else {
	                            							return true;
	                            						}
	                            					})
	                            				})
	                            		}
	                            	})
                        })


					});

				$scope.postComment = function(comment) {
					issueServices.postComment(comment, $scope.issueId)
						.then(function(returnedComments) {
							$scope.commentToAdd.Text = '';
							$scope.comments = returnedComments;
						})
				}

			}
		]);
})();