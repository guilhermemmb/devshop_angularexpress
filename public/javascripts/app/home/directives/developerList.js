'use strict';

angular.module('vtexApp').directive('developerList', ['developerRepository', function (developerRepository) {
	return {
		templateUrl: '/javascripts/app/home/views/partials/developerList.html',
		restrict: 'E',
		scope: {
		},
		controllerAs: 'vm',
		controller: function ($scope) {
			var vm = this;

			vm.list = [];
			vm.loading = true;

			var page = 1;
			var PAGE_SIZE = 30;
			var endList = false;

			function getNext() {
				return developerRepository.getAll(page, PAGE_SIZE).then(function (data) {
					++page;

					if(!data || data.length < PAGE_SIZE) endList = true;

					vm.list = _.union(vm.list, data);
				});
			}

			(function () {

				getNext().finally(function () {
					vm.loading = false;
				});

			})();

		}
	}
}]);
