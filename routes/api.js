var express = require('express');
var router = express.Router();
var resources = require('./apiHelp');
var put = require('pug');



// individual elements:
	// gnome, town, user , testimonial, gnomeHuntingTip


router.use('/gnome', require('./gnome'));
router.use('/town', require('./town'));
router.use('/user', require('./user'));
router.use('/testimonial', require('./testimonial'));
router.use('/ght', require('./ght'));
router.use('/create', require('./create'));
router.use('/stats', require('./stats'));
router.use('/', function(req, res) {
	res.render('apiHelp', {title: "API Directory", resources: resources.res});
});
	

 module.exports = router;