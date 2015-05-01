var q = require('q');
var request = require('request');
var _ = require('lodash');

var cartMemory = {};

function save(key, items) {
	cartMemory[key] = items;
}

function getAll(key) {
	return cartMemory[key] || {};
}

function removeItem(key, id) {
	var list = cartMemory[key];

	if(list[id] === undefined) {
		return false;
	}

	delete list[id];
	return true;
}

var expose = {
	save: save,
	removeItem: removeItem,
	getAll: getAll
}

module.exports = expose;
