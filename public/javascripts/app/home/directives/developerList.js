'use strict';

angular.module('vtexApp').directive('developerList', ['developerRepository','cartService', function (developerRepository, cartService) {
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
			var PAGE_SIZE = 10;
			vm.endList = false;

			function getNext() {
				return developerRepository.getAll(page, PAGE_SIZE).then(function (data) {
					++page;

					if(!data || data.length < PAGE_SIZE) vm.endList = true;

					vm.list = _.union(vm.list, data);
				});
			}

			function getUsers() {
				vm.loading = true;
				return getNext().finally(function () {
					vm.loading = false;
				});
			}
			vm.getUsers = getUsers;

			function addToCart(itm) {
				if(!!parseInt(itm.inputHour) === false) return;

				var selected = _.clone(itm, true);
				selected.hours = itm.inputHour;
				itm.inputHour = 1;

				cartService.add(selected);
			}
			vm.addToCart = addToCart;

			(function () {
				getUsers();
			})();

		}
	}
}]);
