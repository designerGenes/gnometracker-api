var express = require('express');
var router = express.Router();


var selectGHTByID = function(id, callback) {
	callback(0);
};

var selectRandomGHT = function(maxCount, callback) {
	callback(0);
};

router.get('/:id', function (req, res) {
		selectGHTByID(req.params.id, function(result) {

		});
	});	

router.get('/random', function (req, res) {
		selectRandomGHT(1, function(result) {

		}) ;
	});	

router.get('/random/:max', function (req, res) {
		selectRandomGHT(req.params.max, function(result) {
			
		}) ;
	});	

module.exports = router;