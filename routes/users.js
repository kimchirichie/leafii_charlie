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

router.route("/:id")
	.post(function(req, res){
		console.log("POST: /user/:id : Updating user info");
		User.update(req.body,{
			where: {
				id: req.body.id
			}
		});
		res.redirect("/users");
	})
	.delete(function(req, res){
		console.log("DELETE: /user/:id : Delete user");
		res.send("not ready yet");
//		@@@@@@@@@@@@@
	});

module.exports = router;
