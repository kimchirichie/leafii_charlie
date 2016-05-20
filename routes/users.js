var express = require('express');
var router = express.Router();

// DATABASE MODEL
var User = require("../models/user.js");

// Exclusive to admin
router.use(function (req, res, next){
	console.log('MIDDLEWARE: Authenticating Administrator');
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
	console.log("GET: / : Getting user edit page");
	User.all().then(function (users){
		res.render('users/edit',{
			users: users
		});
	});
});

router.post("/:id",function(req, res){
	console.log("POST: /edit : Updating user info");
	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	console.log(req.body);
	User.update(req.body,{
		where: {
			id: req.body.id
		}
	});
	res.redirect("/users")
});

module.exports = router;
