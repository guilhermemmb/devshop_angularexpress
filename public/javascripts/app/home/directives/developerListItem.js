'use strict';

angular.module('vtexApp').directive('developerListItem', [function () {
	return {
		templateUrl: '/javascripts/app/home/views/partials/developerListItem.html',
		restrict: 'E',
		scope: {
			dev: '='
		},
		controllerAs: 'vm',
		controller: function ($scope) {
			var vm = this;

			vm.dev = $scope.dev;
		}
	}
}]);
