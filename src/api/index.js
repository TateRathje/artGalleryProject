'use strict';

var express = require('express');
var Artist = require('../models/artist');

var router = express.Router();

router.get('/artists', function(req, res) {
	Artist.find({}, function(err, artists) {
		if (err) {
			return res.status(500).json({ message: err.message });
		}
		res.json({ artists: artists });
	});
});

router.post('/artists', function(req, res) {
	debugger;
	var artist = req.body;
	Artist.create(artist, function(err, artist) {
		if (err) {
			return res.status(500).json({ message: err.message });
		}
		res.json({ 'artist': artist, message: 'Artist Created' });
	});
});

router.put('/artists/:id', function(req, res) {
	debugger;
	var id = req.params.id;
	var artist = req.body;
	if (artist && artist._id !== id) {
		return res.status(500).json({ err: "Ids don't match!" });
	}
	Artist.findByIdAndUpdate(id, artist, {new: true}, function(err, artist) {
		if (err) {
			return res.status(500).json({ message: err.message });
		}
		res.json({ 'artist': artist, message: 'Artist Updated' });
	});
});

router.delete('/artists/:id', function(req, res) {
	var id = req.params.id;
	Artist.findByIdAndRemove(id, function(err, result) {
		if (err) {
			return res.status(500).json({ message: err.message });	
		}
		res.json({ message: 'Artist Deleted' });
	});
});

module.exports = router; 