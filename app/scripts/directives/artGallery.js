'use strict';


function ArtGalleryDirective () {
	return {
		templateUrl: 'templates/gallery.html',
		replace: true,
		controller: 'galleryCtrl'
	}
}

module.exports = ArtGalleryDirective;