var q = require('q');
var _ = require('lodash');
var cartRepo = require('../repositories/cart');

function save(key, items) {
	cartRepo.save(key, items);
}

function get(key) {
	return cartRepo.getAll(key);
}

var expose = {
	get: get,
	save: save
};

module.exports = expose;

