module.exports = {
	complainAboutMissingData: function(res) {
		res.send("Not enough data!  Gimme more!");
	},
	selectGnomeByID: function(id, res) {
		res.send("made it here");
	},
	selectGnomeByName: function(fName, lName, res) {
		res.send("made it here");
	}

}