var express = require('express');
var router = express.Router();

var selectUserByID = function(id, callback) {
	
}

var selectUserByUsername = function(username, callback) {

};


// function(req, res) {rf.complainAboutMissingData(res);});
router.get('/withName/:username', function(req, res) {
	selectUserByUsername(req.params.username, res) ;
});	
router.get('/:id', function (req, res) {
	selectUserByID(req.params.id, res) ;
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
