'use strict';

angular.module('vtexApp').service('cartRepository', ['$http', function ($http) {

	function save(items) {
		return $http.post('/api/cart/save',{ items: items }).then(function (response) {
			return 'ok';
		}, function (err) {
			return 'fail';
		});
	}

	return {
		save: save
	}
}]);