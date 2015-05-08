var cartService = require('../services/cartService');

function save(req, res) {
	var items = req.body.items;

	var user_key = req.headers.user_key;
	cartService.save(user_key, items);

	res.json('ok');
};

function getCart(req, res) {

	var user_key = req.headers.user_key;
	var items = cartService.get(user_key);

	res.json(items);
};

function checkDiscount(req, res) {
	var discountCode = req.body.discountCode;
	try{
		var value = cartService.checkDiscountCode(discountCode);
	}
	catch (err){
		res.status(406).send(err);
		return;
	}

	res.json({value: value });
};

function checkout(req, res, next) {
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
};

module.exports = {
	save: save,
	checkDiscount: checkDiscount,
	checkout: checkout,
	getCart: getCart
};
