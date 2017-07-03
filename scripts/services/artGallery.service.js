'use strict';

angular.module('artGallery')
.service('artGalleryService', function($http) {
  this.getArtists = function(callback) {
    $http.get('/mock/artGallery.json').then(callback);
  };
});
