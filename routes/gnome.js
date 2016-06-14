var express = require('Express');
var router = express.Router();
var db = require('../db');
var http = require('http');


function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}



// http://localhost:3000/api/gnome/rnd/10


var loadRandomObjs = function (req, res, count) {
	console.log("searching by RANDOM");
	db.models.Gnome.count({}, function (err, totalCount) {
		if (count >= totalCount) {  // return entire list
			count = totalCount;
		}
		db.models.Gnome.find({}, '_id', function(err, result) {
		 	var outArr = new Array();
		 	var mutResult = result;
		 	for (var x = 0; x < count; x++) {
		 		var index = randomInt(0, mutResult.length);
		 		var newGnome = mutResult.splice(index, 1);
		 		outArr.push(newGnome[0]._id);
		 	}
		 	console.log(outArr[0]);
		 	if (outArr.length > 0) {
		 		db.models.Gnome.find({ '_id': { $in: outArr } }, 'firstName lastName christeningName threatLevel', function(err, docs) {
		 		if (docs.length > 0) {
		 			renderResults(req, res, docs)
		 		} else {
		 			res.redirect('/api');
		 		}
		 	});
		 	}
		 })
	})	
}

router.get('/rnd/:count', function(req, res) {
	loadRandomObjs(req, res, req.params.count)
})

router.get('/rnd/', function (req, res) {
	var count = req.query.queryCount;
	if (count > 0) {
		var fullURL = "/api/gnome/rnd/" + count
		res.redirect(fullURL);
	} else {
		res.send("Gnomes!");
	}
});

router.get('/:fName/:lName', function(req, res) { 
	db.models.Gnome.findOne({'firstName': req.params.fName, 'lastName': req.params.lName}, 
							'firstName lastName christeningName threatLevel', function(err, docs) {
		if (err) {
			res.redirect('/api');
		}
		console.log("Found something");
		
		renderResults(req, res, [docs]);
	});
});
router.get('/:id', function(req, res, next) { 
	var id = req.params.id;
	db.models.Gnome.findOne({'_id' : id}, 
		'firstName lastName christeningName threatLevel', function(err, docs) {
		if (docs === undefined) {
			res.render('queryError', {});
		} else {
			renderResults(req, res, [docs]);
		}
	}); 
});




var renderResults = function(req, res, result) {
	var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;

	var isRnd = false;
    res.render('renderResult', 
    	{title: "results" , fullURL: fullURL, isRnd: isRnd, objType: "gnome", dbObj: result});
};

router.use('/', function(req, res) {
	console.log("redirecting to API");
	res.redirect('/api');
});





module.exports = router;
