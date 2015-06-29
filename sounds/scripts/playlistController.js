'use strict';

var controller = function($scope, PlaylistService) {
	$scope.things = [];

	$scope.retrieveThings = function() {

		PlaylistService.getThings(function(error, data) {
			if (error) {
				console.log('o noz');
			} else {
				$scope.things = data;
			}
		}); // end PlaylistService
	}; // end getThings
}; // end controller

// Declare controller
angular.module('sounds').controller('PlaylistController', controller);