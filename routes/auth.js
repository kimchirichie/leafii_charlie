var express = require("express");
var app = express();
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt   = require("bcrypt-nodejs");


// DATABASE MODEL
var User = require("../models/user.js");

// LOG TIME
router.use(function (req, res, next){
	console.log("AUTH: ", Date.now());
	next();
});

// PASSPORT
passport.use(new LocalStrategy(
	function(username, password, done){
		console.log("Local Auth Strategy Init");
		User.findOne({where:{username: username}}).then(function (user){
			if (!user){
				console.log("Local Auth Strategy Failed: No user found");
				return done(null, false, {message: "Incorrect username"});
			}
			console.log("Database query finished. Checking data");
			// console.log("password: ", password);
			// console.log("salt: ", user.salt);
			// console.log("hash input+salt: ",bcrypt.hashSync(password, user.salt, null));
			// console.log("hash password: ", user.password);
			// console.log("match: ", bcrypt.compareSync(password, user.password))
			if (!bcrypt.compareSync(password, user.password)) {
				console.log("Local Auth Strategy Failed: Password Mismatch");
				return done(null, false, {message: "Incorrect password"});
			}
			console.log("User authenticated");
			return done(null, user);
		});
	}
));

// ROUTES

	// SIGNUP
router.route("/signup")
	// serves up static signup page
	.get(function (req,res){
		console.log("GET: /signup : Getting signup page");
		if (req.user){
			console.log("User session found. Invoke error");
			req.flash('error', 'Already signed in!');
			res.redirect("/"); // give error in future
		} else {
			res.render('auth/signup',{
				title: "Leafii-Signup",
				error: req.flash("error")
				// error: 'hello'
			});
		}
	})
	// records new signup
	// requires: user session is undefined
	.post(function (req, res){
		console.log("POST: /signup : Recording Signup");
		if (req.user){
			console.log("User session found. Invoke error");
			req.flash("error", "can not be signed in!"); // CHANGE THIS TO PROPERLY RESPOND
			res.redirect("/")
		} else if (req.body.password != req.body.confirm){
			console.log("Passwords mismatch. Invoke error");
			req.flash("error", "passwords do not match"); // CHANGE THIS TO PROPERLY RESPOND
			res.redirect("/auth/signup")
		} else if (req.body.username == "" || req.body.password == "") {
			console.log("Required fields blank. Invoke error");
			req.flash("error", "required fields can not be blank"); // CHANGE THIS TO PROPERLY RESPOND
			res.redirect("/auth/signup")
		} else {
			console.log("Parameters all good. Proceed to record in database")
			User.sync().then(function (){
				var data = req.body;
				data.salt = bcrypt.genSaltSync(8);
				data.password = bcrypt.hashSync(req.body.password, data.salt, null);
				console.log(data);
				User.create(data).then(function (user){
					console.log("Successfully recorded user in database");
					console.dir(user.get());
					req.flash('success', 'Sign up successful. plese sign in!');
					res.redirect("/auth/signin")
				}, function (err){
					console.log("Unsuccessful in recording user in database");
					req.flash("error", "Unsuccessful in recording user in database");
					res.redirect("/auth/signup");
				})
			});
		}
	});

	// SIGNIN
router.route("/signin")
	// servers up static signin page
	// requires: user session is undefined
	.get(function (req, res){
		console.log("GET: /signin : Getting signin page");
		if (req.user) { 
			console.log("User session found. Redirecting to user page");
			req.flash('error', 'Already signed in!')
			res.redirect("/"); // give success in future
		} else {
			console.log("User session not found. Continue to signin page");
			res.render('auth/signin',{
				title: "Leafii-Signin",
				error: req.flash("error")
			});
		}
	})
	// authenticated user
	.post(function(req, res, next){
		console.log("POST: /signin : Authenticating user");
		next();
	},passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/auth/signin",
			failureFlash: 'Invalid username or password.'
	}));

	// SIGNOUT
router
	// signs out user
	.all("/signout",function(req, res){
		console.log("ANY: /signout : Signing out user");
		req.logout();
		console.log("Redirecting to landing page");
		req.flash('success', 'Successfully signed out!')
		res.redirect("/");
	});

	// ADMIN OF USER
// router.route("/admin")
// 	// serves up static admin page
// 	// requires: user session to exist
// 	.get(function (req, res){
// 		console.log("GET: /admin : Getting admin page");
// 		if (!req.user) { 
// 			console.log("User session not found. Redirecting to signin page");
// 			return res.redirect("/auth/signin");
// 		} else {
// 			console.log("User session found. Continue to admin page");
// 			res.sendFile(path.join(__dirname, "../views/useradmin.html"));
// 		}
// 	});

module.exports = router;