'use strict';


function GalleryCtrl ($scope, galleryService){

	galleryService.getArtists(function(response) {
		debugger;
		var artists = response.data.artists;
		$scope.artists = artists;
	});

	$scope.saveArtist = function(artistForm) {
		debugger;
		var newArtist = angular.copy(artistForm);
		$scope.artists.unshift(newArtist);
		$scope.artistForm = null;
		var filteredArtists = $scope.artists.filter(function(artist) {
			if (artist.edited || !artist._id) {
				return artist
			};
		})
		galleryService.saveArtists(filteredArtists)
			.finally($scope.resetArtistState());
	};

	$scope.resetArtistState = function() {
		debugger;
		$scope.artists.forEach(function(artist) {
			artist.edited = false;
		});
	};

	$scope.updateArtist = function(artist, index) {
		debugger;
		var editedArtist = $scope.artists.splice(index, 1);
		galleryService.updateArtist(editedArtist, index);
	};

	$scope.deleteArtist = function(artist, index) {
		galleryService.deleteArtist(artist).then(function() {
			$scope.artists.splice(index, 1);
		});
	};
}

module.exports = GalleryCtrl;