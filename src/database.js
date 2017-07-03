'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/artgallery', function(err) {
	if (err) {
		console.log('Failed connecting to mongoDB!');
	} else {
		console.log('Successfully connected to MongoDB!');
	}
});