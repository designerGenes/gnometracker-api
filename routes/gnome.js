var express = require('Express');
var router = express.Router();
var db = require('../db')





router.get('/:fName/:lName', function(req, res) { 
	db.models.Gnome.find({firstName: req.params.fName, lastName: req.params.lName}, function(err, result) {
		if (result.length > 0) { 
			renderResults(req, res, result);
		} else {
			res.json({error: "no match"});
		}

	});
});
router.get('/:id', function(req, res) { 
	db.retrieveObjWithID(req.params.id, db.models.Gnome, function(result) {
		if (result === undefined) {
			res.render('queryError', {});
		} else {
			renderResults(res, result);
		}
	}); 
});

var renderResults = function(res, result) {
 res.render('renderResult', {results: result});
}

router.use('/', function(req, res) {
	res.redirect('/api');
});





module.exports = router;
