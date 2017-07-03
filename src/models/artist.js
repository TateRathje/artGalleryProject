'use strict';

var mongoose = require('mongoose');

var artSchema = new mongoose.Schema({
	artName: String,
	price: { type: Number },
	description: String
}); 

var artistSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	dob: { type: Date },
	art: [artSchema]
});

var model = mongoose.model('Artist', artistSchema);

module.exports = model;