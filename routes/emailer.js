var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


// DATABASE MODEL
var User = require("../models/user.js");

// Exclusive to admin
router.use(function (req, res, next){
	console.log('Emailer is here');
	if (!req.user){
		res.redirect("/auth/signin");
	} else if (!req.user.admin){
		res.send("Access Denied");
	} else {
		next();
	}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('contact/emailer', {title: 'Emailer'});
});

router.post("/send",function(req, res, next){

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'support@leafii.com',
			pass: 'deathology'
		}
	});

	var mailOptions = {
		from: '"Leafii" <support@leafii.com>',
		to: 'sinr0202@gmail.com',
		subject: 'Testing out this emailer',
		text: req.body.Message,
		html: '<p> You got mail</p>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			req.flash("error", "Email failed to send");
			res.send('Failure');
		}
		else {
			req.flash("error", "Email is sent!");
			res.send('Success');
		}
	});
});

module.exports = router;
