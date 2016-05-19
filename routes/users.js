var express = require('express');
var router = express.Router();

// DATABASE MODEL
var User = require("../models/user.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.all().then(function (users){
		res.render('user/index',{
			users: users
		});
	});
});

module.exports = router;
