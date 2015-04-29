'use strict';

var app = angular.module('vtexApp', [
	'ngRoute'
]).config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true);
}])
.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/home', {
		templateUrl: '/javascripts/app/home/views/index.html',
		controller: 'homeController'
	})
	.when('/cart', {
		templateUrl:'/javascripts/app/cart/views/index.html',
		controller: 'cartPageController'
	}).otherwise({
		redirectTo: '/home'
	});

}]);
