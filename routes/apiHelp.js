var _ = require('underscore');

	function makeEmptyArraysIfNeeded(obj) {
	//  init empty arrays if not already literally established	
		if (obj.root != "/create") {
			if (!obj.hasOwnProperty('nouns')) {
				obj.nouns = [];
			}
			if (!obj.hasOwnProperty('verbs')) {
				obj.verbs = [];
			}

			obj.nouns.push({path: "/:id", desc: "return OBJECT with matching id"});
			obj.nouns.push({path: "/rnd/:count", desc: "return random array of :count OBJECTs" });
			obj.verbs.push({path: "/:id/delete" , desc: "delete OBJECT with matching id"});
		}
		return obj
	}

	function addOne(x) {
		return x + 1
	}

	// exports.res = _.map([1, 2, 3], addOne);

	exports.res = _.map([
		{ root: '/gnome', nouns: [
			{path: "/:fName/:lName", desc: "return GNOME with matching firstName and lastName"}
		]},
		{root: '/town', nouns: [
			{path: '/withName/:name', desc: "return TOWN with matching name"}
		]},
		{root: '/user', nouns: [
			{path: '/withName/:username' , desc: "return USER with matching username"}
		]},
		{root: '/testimonial', nouns: [ 
			{path: '/fromCity/:cityName' , desc: "return random TESTIMONIAL from matching city"}
		]},
		{root: '/ght', nouns: [ 
			{path: '/random', desc: "return 1 random Gnome Hunting Tip"},
			{path: '/random/:max' , desc: "return (max) random Gnome Hunting Tips"}
		]},
		{ root: '/create', verbs: [
			{path: "/:objType/:x" , desc: "create and save x instances of objType to database"},
			{path: "/:objType/:x/basedOn/:id" , desc: "create and save x instances of objType to database, with properties matching object id"}
		]}
	], makeEmptyArraysIfNeeded);
	

	

	this.explainCommand = function(x) {
		if (x < exports.res.length) {
			var res = exports.res[x];
			console.log(res);
		}
	}

	// this.listCommands = function() {
	// 	var out = new Array();
	// 	for (resource in exports.res) {
	// 		var res = this.res[resource];
	// 		var nounPaths = res.nouns;
	// 		console.log(nounPaths);
	// 		var verbPaths = res.verbs;
	// 		var nOut = _.map(nounPaths, function(n) {
	// 			var out = n.path + "     " + n.desc;
	// 			return out ;
	// 		});
	// 		var vOut = _.map(verbPaths, function(v) {
	// 			var out = v.path + "     " + v.desc; ;
	// 			return out ;
	// 		});
	// 		out.push ([res.root, nOut, vOut ]); 

	// 	}
		
	// 	return out;
	// };
	
// } 