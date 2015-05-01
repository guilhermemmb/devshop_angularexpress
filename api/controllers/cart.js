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

router.post('/checkDiscount', function(req, res, next) {
	var discountCode = req.body.discountCode;
	try{
		var value = cartService.checkDiscountCode(discountCode);
	}
	catch (err){
		res.status(406).send(err);
		return;
	}

	res.json({value: value });
});

router.post('/checkout', function(req, res, next) {
	var user_key = req.headers.user_key;

	var discountCode = req.body.discountCode;

	var checkoutData = undefined;
	try {
		checkoutData = cartService.checkout(user_key, discountCode);
	}
	catch (err){
		if(err === 'EMPTY_CART') {
			res.status(406).send(err);
			return;
		}

		res.status(500).send(err);
		return;
	}

	res.json(checkoutData);
});

module.exports = router;
