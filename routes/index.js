var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Leafii' });
});

router.get('/thankyou', function(req, res, next) {
  res.render('thankyou', { title: 'thankyou' });
});

module.exports = router;
