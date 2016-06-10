var express = require('express');
var router = express.Router();

var selectTownByName = function(name, callback) {
	callback(0);
}
    
router.get('/withName/:name', function(req, res) {
	selectTownByName(req.params.name, function(result) {

	}) ;
});
router.use('/', function(req, res) {
	res.send("Not enough information!");
});


	


	module.exports = router;