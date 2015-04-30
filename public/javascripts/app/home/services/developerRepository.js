'use strict';

angular.module('vtexApp').service('developerRepository', ['$http', function ($http) {

	function getAll(page, size) {
		return $http.get('/api/users/getAll',{ params: { page: ( page || 1 ), size: (size || 30) }}).then(function (response) {
			return response.data;
		});
	}

	return {
		getAll : getAll
	}
}]);