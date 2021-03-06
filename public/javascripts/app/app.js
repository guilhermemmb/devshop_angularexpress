'use strict';

var app = angular.module('vtexApp', [
	'ngRoute',
	'ui.mask',
	'ngCookies'
]).config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true);
}])
.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/home', {
		templateUrl: '/javascripts/app/home/views/index.html',
		controller: 'homeController as vm'
	})
	.when('/cart', {
		templateUrl:'/javascripts/app/cart/views/index.html',
		controller: 'cartController as vm'
	}).otherwise({
		redirectTo: '/home'
	});

}]);
