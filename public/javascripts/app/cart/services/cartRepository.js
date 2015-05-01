'use strict';

angular.module('vtexApp').service('cartRepository', ['$http','userService', function ($http, userService) {

	var config = {
		headers : {
			'user_key': userService.getUserKey()
		}
	};

	function checkDiscount(code) {
		return $http.post('/api/cart/checkDiscount',{ discountCode: code}, config).then(function (response) {
			return response.data;
		}, function (err) {
			return err;
		});
	}

	function save(items) {
		return $http.post('/api/cart/save',{ items: items }, config).then(function (response) {
			return 'ok';
		}, function (err) {
			return 'fail';
		});
	}

	function getCart() {
		return $http.get('/api/cart/get', config).then(function (response) {
			return response.data;
		}, function (err) {
			return 'fail';
		});
	}

	function proceedCheckout(code) {
		return $http.post('/api/cart/checkout',{ discountCode: code}, config).then(function (response) {
			return response.data;
		}, function (err) {
			return err;
		});
	}

	return {
		save: save,
		getCart: getCart,
		checkDiscount: checkDiscount,
		proceedCheckout : proceedCheckout
	}
}]);