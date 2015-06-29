'use strict';

// use Angular $http
var service = function($http) {

	this.getThings = function(callback) {
		$http.get('http://api.soundcloud.com/users/schifano/playlists.json?client_id=2a8ba0f2aaaab345a172ca3e9f4f525b&q=rachel%20selects')
			.success(function(data) {
				return callback(null, data);
			})
			.error(function(error) {
				return callback(error);
			});
	}
}; // end service function

angular.module('sounds').service('PlaylistService', service);