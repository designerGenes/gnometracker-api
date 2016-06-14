var express = require('Express');
var router = express.Router();
var db = require('../db');
var http = require('http')
var faker = require('faker');

var stringToModelDict = {
	"gnome": db.models.Gnome,
	"town": db.models.Town,
	"user": db.models.User,
};

var renderResults = function(req, res, objType) {
	res.render('create', {title: "Create", objType: objType});
}

var returnRandomPropertiesFor = function(objType) {
	switch (objType) {
		case "gnome":
			return { "firstName": faker.name.firstName(), "lastName": faker.name.lastName(), 
					"christeningName" : faker.name.lastName(), "threatLevel" : faker.random.number(), 
					"heightInApples": faker.random.number(), "lastSighting" : faker.date.past() 
				}
		case "town":
			return { "name" : faker.name.firstName(), "population" : faker.random.number(), 
					"hasTakenPrecautions": faker.random.boolean(), "hasTakenEnoughPrecautions" : faker.random.boolean(), 
					"precautionsTaken" :[] 
				}
		case "user":
			return { "firstName": faker.name.firstName(), "lastName": faker.random.lastName(), 
					"username" : faker.internet.username(), "email" : faker.internet.email(), 
					"opinionOnGnomes" : faker.random.boolean(), "joinDate" : faker.date.past(),
					"gnomeSightings" : []
				}
		default:
			return {};
	}
}
router.use('/:objType/:x', function (req, res) {
	var objType = req.params.objType;
	var x = req.params.x;

	var objPropList = returnRandomPropertiesFor(objType)
	
	if (objType in stringToModelDict) {
		var Model = stringToModelDict[objType.toLowerCase()];
		for(var y = 0; y< x; y++) {
			var objPropList = returnRandomPropertiesFor(objType)
			var newObj = new Model(objPropList);
			newObj.save();
		}
		res.redirect('/')
		// res.json({msg:"Success"});
	} else {
		res.json({error: "not valid model to create"});
	} 
});

router.post('/:objType/', function(req, res) {
	
	var objType = req.params.objType;
	var x = req.body.createCount;
	var out = objType + "/" + x;
	res.redirect(out)
})

router.get('/:objType', function(req, res) {
	var objType = req.params.objType;
	renderResults(req, res, objType)
});

module.exports = router;