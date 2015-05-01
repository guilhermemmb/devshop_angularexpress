'use strict';

angular.module('vtexApp').service('cartService', ['cartRepository', '$q', function (cartRepository, $q) {
	var cartItems = undefined;
	var discountCode = "";

	function checkout() {
		var defer = $q.defer();

		if(timeout !== undefined) {
			timeout = undefined;
		}

		cartRepository.save(cartItems).then(function () {
			cartRepository.proceedCheckout(discountCode).then(function (data) {
				defer.resolve(data);
			}, function () {
				return $q.defer().reject();
			});
		}, function () {
			return $q.defer().reject();
		});

		return defer.promise;
	}

	function setDiscount(code) {
		discountCode = code;
	}
	function getDiscountCode() {
		return discountCode;
	}

	function getDiscountValue() {
		if(discountCode.length > 0)
			return cartRepository.checkDiscount(discountCode);

		return $q.defer().reject();
	}

	var timeout = undefined;
	function persist() {
		if(timeout !== undefined) clearTimeout(timeout);

		timeout = setTimeout(function () {
			cartRepository.save(cartItems)
		}, 2000);
	}

	var get = (function () {
		var defer = undefined;

		return function() {
			if(defer === undefined) {
				defer = $q.defer();
			}

			if(cartItems === undefined) {
				cartRepository.getCart().then(function (data) {
					cartItems = data;

					defer.resolve(cartItems);
				});
			}
			else {
				defer.resolve(cartItems);
			}

			return defer.promise;
		}
	})();

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
		getItems: get,
		setDiscount: setDiscount,
		getDiscountCode: getDiscountCode,
		getDiscountValue: getDiscountValue,
		checkout: checkout
	}
}]);