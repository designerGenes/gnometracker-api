var express = require('express');
var router = express.Router();

var selectTestimonialByID = function(id, callback) {

};

var selectTestimonialByCityName = function(name, callback) {

};

router.get('/:id', function (req, res) {
	selectTestimonialByID(req.params.id, function(result) {

	}) ;
});	
router.get('/fromCity/:cityName', function (req, res) {
	selectTestimonialByCityName(req.params.cityName, function(result) {

	}) ;
});	

router.use('/', function (req, res) {
	res.send("Not enough information!");
});




module.exports = router;