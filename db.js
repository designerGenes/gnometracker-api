var mongoose = require('mongoose');
var faker = require('faker');

var Schema = mongoose.Schema;

var GnomeSchema = new mongoose.Schema({
			firstName: {type: String, default: faker.name.firstName()}, 
			lastName: {type: String, default: faker.name.lastName()},
			christeningName: {type: String, default: faker.name.firstName()},
			threatLevel: {type: Number, default: faker.random.number()},
			heightInApples: {type: Number, default: faker.random.number()},
			lastSighting: {type: Date, default: faker.date.past()},
		});

var	TownSchema = new mongoose.Schema({
			name: String,
			population: Number,
			hasTakenPrecautions: Boolean,
			hasTakenEnoughPrecautions: Boolean,
			precautionsTaken: Array,
		});
var UserSchema = new mongoose.Schema({
			firstName: String,
			lastName: String,
			username: String,
			emailAddress: String,
			opinionOnGnomes: Boolean,
			joinDate: Date,
			gnomeSightings: Array,
		});
var TestimonialSchema = new mongoose.Schema({
			posterID: String,
			date: Date,
			cityID: String,
			textBody: String,
			endedInOneLessGnomeOnTheStreets: Boolean
		});
var GnomeHuntingTipSchema = new mongoose.Schema ({
			posterID: String,
			score: Number,
			textBody: String,
		});

// var returnFakeData = function(x) {
// 	if (x instanceOf String) { return faker.name.firstName() }
// 	else if (x instanceOf Number) { return faker.random.number() }
// 	else if (x instanceOf Date) { return faker.date.past() }
// 	else if (x instanceOf Boolean) { return faker.random.boolean() }	
// }

module.exports = {
	dburl : 'mongodb://localhost/gnometracker-db',
	schemas : {
		gnome: GnomeSchema,
		town: TownSchema,
		user: UserSchema,
		testimonial: TestimonialSchema,
		gnomeHuntingTip: GnomeHuntingTipSchema
	},
	models: {
		Gnome: mongoose.model('Gnome', GnomeSchema),
		Town: mongoose.model('Town', TownSchema),
		User: mongoose.model('User', UserSchema),
		Testimonial: mongoose.model('Testimonial', TestimonialSchema),
		GnomeHuntingTip: mongoose.model('GnomeHuntingTip', GnomeHuntingTipSchema)
	},
	db: mongoose.connection,
	initConnection: function(callback) {
		mongoose.connect(this.dburl);
		this.db = mongoose.connection;
		this.db.on('error', console.error.bind(console, 'connection error:'));
		this.db.once('open', function() {
		  callback();

		});
	},
	retrieveObjWithID: function(id, model, callback) {
		// let targetObj = new model()
		model.findById(id, function (err, target) {
			if (err) console.log(err);
			callback(target);
		});
	},
	createFakeDBObjectsOfType: function(model, count, callback) {
	  var createdObjs = new Array();
	  for(var x=0; x< count; x++) {
	  	var newSchema = new GnomeSchema({});

	  	var newObj = new model({}, function (err, newObj) {
	  		newObj.save();
	  		createdObjs.push(newObj);

	  		if (createdObjs.length == count) {
	  			callback();
	  		}
	  	});
	  }
	}


}
