var express = require('express');
var router = express.Router();
var cartService = require('../services/cartService');

router.post('/save', function(req, res, next) {
	var items = req.body.items;

	var user_key = req.headers.user_key;
	cartService.save(user_key, items);

	res.json('ok');
});

router.get('/get', function(req, res, next) {

	var user_key = req.headers.user_key;
	var items = cartService.get(user_key);

	res.json(items);
});

module.exports = router;
