var express = require('Express');
var router = express.Router();
var db = require('../db');
var http = require('http');
var mongoose = require('mongoose');

router.use('/:resource', function(req, res) {
	var resource = req.params.resource;
	selectCollectionFromDB(resource, function (obj) {
		res.render('stats', {objName: resource, data: obj});
	});
	

});

function selectCollectionFromDB(name, callback) {
	var schema = db.schemas[name];
	if (schema) {
		var model = mongoose.model(name, schema);
		model.find({}, null, function (err, docs) {
			if (err) { console.log(err);}
			var out = {
				"count": docs.length
			};
			callback(out);
		});
	}
}

module.exports = router;