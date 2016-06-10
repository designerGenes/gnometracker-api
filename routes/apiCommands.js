var _ = require('underscore');

module.exports = function() { 

	this.res = {
		
		gnome: { root: '/gnome', nouns: [
			{path: "/:fName/:lName", desc: "return GNOME with matching firstName and lastName"}
		]},
		town: {root: '/town', nouns: [
			{path: '/withName/:name', desc: "return TOWN with matching name"}
		]},
		user: {root: '/user', nouns: [
			{path: '/withName/:username' , desc: "return USER with matching username"}
		]},
		testimonial: {root: '/testimonial', nouns: [ 
			{path: '/fromCity/:cityName' , desc: "return random TESTIMONIAL from matching city",}
		]},
		ght: {root: '/ght', nouns: [ 
			{path: '/random', desc: "return 1 random Gnome Hunting Tip"},
			{path: '/random/:max' , desc: "return (max) random Gnome Hunting Tips"}
		]},
	};
	
	

	for (resource in this.res) {
		var res = this.res[resource];
		if (!res.hasOwnProperty('nouns')) {
			res.nouns = [];
		}
		if (!res.hasOwnProperty('verbs')) {
			res.verbs = [];
		}

		res.nouns.push({path: "/:id", desc: "return OBJECT with matching id"});
		res.nouns.push({path: "/range/:start/:stop", desc: "return array of OBJECTs between indexes" });
		res.verbs.push({path: "/:id/delete" , desc: "delete OBJECT with matching id"});
	};

	this.res.remove = { root: '/remove', verbs: {
			path: "/:objType/:x" , desc: "remove first x instances of objType from database",
	}, nouns: {}};

	this.res.create = { root: '/create', verbs: {
			path: "/:objType/:x" , desc: "create and save x instances of objType to database",
			path: "/:objType/:x/basedOn/:id" , desc: "create and save x instances of objType to database, with properties matching object id"
	}, nouns: {}};

	this.commandsList = function() {
		var out = new Array();
		for (resource in this.res) {
			var res = this.res[resource];
			var nounPaths = res.nouns;
			console.log(nounPaths);
			var verbPaths = res.verbs;
			var nOut = _.map(nounPaths, function(n) {
				var out = n.path + "     " + n.desc;
				return out ;
			});
			var vOut = _.map(verbPaths, function(v) {
				var out = v.path + "     " + v.desc; ;
				return out ;
			});
			out.push ([res.root, nOut, vOut ]); 

		}
		console.log(out);
		return out;
	};
	
} 