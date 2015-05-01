'use strict';

angular.module('vtexApp').service('cartService', ['cartRepository', function (cartRepository) {
	var cartItems = {};

	var timeout = undefined;

	function persist() {
		if(timeout !== undefined) clearTimeout(timeout);

		timeout = setTimeout(function () {
			cartRepository.save(cartItems)
		}, 10000);
	}

	function get() {
		return cartItems;
	}

	function add(itm) {
		if(cartItems[itm.login]!== undefined)  {
			cartItems[itm.login].hours += parseInt(itm.hours);
		} else {
			itm.hours = parseInt(itm.hours);
			cartItems[itm.login] = itm;
		}

		persist();
	}

	function remove(itm) {
		if(cartItems[itm.login]!== undefined) {
			delete cartItems[itm.login];
		}

		persist();
	}

	return {
		add: add,
		remove: remove,
		getItems: get
	}
}]);