'use strict';

angular.module('artGallery')
.controller('artGalleryCtrl', function(artGalleryService){
	var self = this;

	artGalleryService.getArtists(function(response) {
		self.artists = response.data;
	});

	this.saveArtist = function(artist) {
		debugger;
		self.artists.unshift(artistForm);
	};
});