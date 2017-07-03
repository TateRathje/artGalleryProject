'use strict';

angular.module('artGallery')
.directive('artGallery', function() {
	return {
		templateUrl: 'templates/gallery.html',
		replace: true,
		controller: 'artGalleryCtrl',
		controllerAs: 'artCtrl'
	}
})