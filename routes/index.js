var express = require("express");
var router = express.Router();

// DATABASE MODEL
var Feedback = require("../models/feedback.js");

// LANDING
router.get("/", function(req, res, next) {
	console.log("GET: / : Getting landing page");
	res.render("index", {
		title: "Leafii",
		err: req.flash("error")[0]
	});
});

// POST SIGNUP
router.get("/thankyou", function(req, res, next) {
	console.log("GET: /thankyou : Getting thankyou page");
	res.render("thankyou", { title: "thankyou" });
});

// FEEDBACK
router.route("/feedback")
	.get(function(req, res, next) {
		console.log("GET: /feedback : Getting feedback page");
		res.render("feedback", { 
			title: "Leafii - Feedback",
			err: req.flash("error")[0]
		})
	})
	.post(function(req, res, next) {
		console.log("POST: /feedback : Recording Feedback");
		Feedback.sync().then(function (){
			Feedback.create(req.body).then(function (feedback){
				console.log("Successfully recorded feedback in database");
				console.dir(feedback.get());
				req.flash("success", "Your feedback has been received successfully. Thank you!");
				res.redirect("/")
			}).catch(function (err){
				console.log("Unsuccessful in recording feedback in database");
				console.dir(err)
				req.flash("error", err.errors[0].message);
				res.redirect("/feedback");
			});
		});
	})

module.exports = router;
