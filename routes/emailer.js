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
		res.send("access denied");
	} else {
		next();
	}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('contact', {title: 'Contact'});
});

router.post("/send",function(req, res, next){

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'support@leafii.com',
			pass: 'something'
		}
	});

	var mainOptions = {
		from: 'John Doe <johndoe@gmail.com',
		to: 'techguy@gmail.com',
		subject: 'Website Submission',
		text: 'you have a new submission with the following details' + req.body.name + 'Email: '+req.body.email+ 'Message: ' +req.body.message,
		html: '<p> you got mail</p>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		}
		else {
			console.log('Message sent: '+info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
