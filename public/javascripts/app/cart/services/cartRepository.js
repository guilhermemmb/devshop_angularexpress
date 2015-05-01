'use strict';

angular.module('vtexApp').service('cartRepository', ['$http','userService', function ($http, userService) {

	var config = {
		headers : {
			'user_key': userService.getUserKey()
		}
	};

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

	return {
		save: save,
		getCart: getCart
	}
}]);