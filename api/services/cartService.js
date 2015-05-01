var q = require('q');
var _ = require('lodash');
var cartRepo = require('../repositories/cart');

function save(key, items) {
	cartRepo.save(key, items);
}

function get(key) {
	return cartRepo.getAll(key);
}

var availableCodes = {
	'SHIPIT': 15
};

function checkDiscountCode(code) {
	var value = availableCodes[code];
	if(value === undefined) {
		throw "unavailable code";
	}
	return value;
}

function checkout(user_key, discountCode) {
	var items = get(user_key);
	if(!items || !Object.keys(items).length) {
		throw 'EMPTY_CART';
		return;
	}

	var discountValue = 0;
	try {
		discountValue = checkDiscountCode(discountCode);
	}
	catch(err) {}

	var totalValue = 0;

	_.each(items, function (element) {
		totalValue += element.value * element.hours;
	});

	cartRepo.clear(user_key);

	return (totalValue -  (totalValue * (discountValue / 100))).toFixed(2);
}

var expose = {
	get: get,
	save: save,
	checkDiscountCode: checkDiscountCode,
	checkout: checkout
};

module.exports = expose;

