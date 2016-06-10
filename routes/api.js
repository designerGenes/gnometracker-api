var express = require('express');
var router = express.Router();
var apiCommands = require('./apiCommands');
var AC = new apiCommands();
var put = require('pug');



// individual elements:
	// gnome, town, user , testimonial, gnomeHuntingTip


router.use('/gnome', require('./gnome'));
router.use('/town', require('./town'));
router.use('/user', require('./user'));
router.use('/testimonial', require('./testimonial'));
router.use('/ght', require('./ght'));
router.use('/create', require('./create'));
router.use('/', function(req, res) {
	res.render('apiHelp', {commandsList: AC.commandsList()});
});
	

 module.exports = router;