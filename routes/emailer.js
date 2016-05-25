var express = require('express');
var router = express.Router();

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
	res.send('some string');
});

router.post("/:id",function(req, res){
	res.send('some string');
});

module.exports = router;
