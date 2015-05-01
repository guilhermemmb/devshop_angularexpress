'use strict';

angular.module('vtexApp').controller('cartController',['$window', 'cartService', function ($window, cartService) {
	var vm = this;

	vm.discountValue = 0;

	function onEnterDiscountField() {
		vm.loadingDiscount = true;
	}
	vm.onEnterDiscountField = onEnterDiscountField;

	function checkDiscount() {
		vm.loadingDiscount = true;
		if(vm.discountCode.length === 0) {
			vm.discountValue = 0;
		};
		cartService.setDiscount(vm.discountCode);

		cartService.getDiscountValue().then(function(data) {
			vm.discountValue = data.value;
		}, function (){
			vm.discountValue = 0;
		}).finally(function () {
			vm.loadingDiscount = false;
		});
	}
	vm.checkDiscount = checkDiscount;

	function checkout() {
		cartService.checkout().then(function (data) {
			alert('GRATZ: TOTAL = ' + data);

			$window.location.reload();
		});
	}
	vm.checkout = checkout;

	(function () {
		vm.discountCode = cartService.getDiscountCode();
	})();
}]);