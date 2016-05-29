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
		to: 'tiannyrenny@gmail.com, richard.sin@uwaterloo.ca',
		subject: req.body.Subject,
		text: req.body.Message,
		html: '<p>' + req.body.Message + '</p>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			req.flash("error", "Email failed to send");
			res.redirect("/contact");
		}
		else {
			req.flash("error", "Email is sent!");
			res.redirect("/contact");
		}
	});
});

module.exports = router;
