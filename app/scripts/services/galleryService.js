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
