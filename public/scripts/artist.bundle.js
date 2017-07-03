webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('artGallery', []);

	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(7);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('artGallery').service('galleryService', __webpack_require__(4));

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';


	function GalleryService ($http, $q) {

	  this.getArtists = function(callback) {
	    $http.get('/api/artists').then(callback);
	  };

	  this.deleteArtist = function(artist) {
	    debugger;
	  	if (!artist._id) {
	  		return $q.resolve();
	  	}
	  	return $http.delete('/api/artists/' + artist._id).then(function() {
	  		console.log("I deleted the " + artist.firstName + " artist!" );
	  	});
	  };

	  this.updateArtist = function(artist, index) {
	    debugger;
	    var artist = artist[index];
	    if (!artist._id) {
	      return $q.resolve();
	    }
	    $http.put('/api/artists' + artist._id, artist).then(function(result) {
	          artist = result.data.artist;
	          return artist;
	    });       
	  };

	  this.saveArtists = function(artists) {
	  	var queue = [];
	  	artists.forEach(function(artist) {
	  		var request;
	  		if (!artist._id) {
	        debugger;
	  			request = $http.post('/api/artists', artist);
	  		} else {
	        debugger;
	  			request = $http.put('/api/artists' + artist._id, artist).then(function(result) {
	  				artist = result.data.artist;
	  				return artist;
	  			});
	  		}
	  		queue.push(request);
	  	});
	  	return $q.all(queue).then(function(results) {
	  		console.log("I saved " + artists.length + " artists!");
	  	});
	  };
	   
	}

	module.exports = GalleryService;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('artGallery').directive('artGallery', __webpack_require__(6));

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';


	function ArtGalleryDirective () {
		return {
			templateUrl: 'templates/gallery.html',
			replace: true,
			controller: 'galleryCtrl'
		}
	}

	module.exports = ArtGalleryDirective;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('artGallery').controller('galleryCtrl', __webpack_require__(8));

/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ }
]);