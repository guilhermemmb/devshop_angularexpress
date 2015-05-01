'use strict';

angular.module('vtexApp').service('userService', ['$cookieStore', function ($cookieStore) {
	var KEY_NAME= 'vtext_test_user';

	function generate()
	{
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 10; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	function getUserKey() {
		var id = $cookieStore.get(KEY_NAME);
		if(!id || !id.length) {
			$cookieStore.put(KEY_NAME, generate());
			id = $cookieStore.get(KEY_NAME);
		}
		return id;
	}

	return {
		getUserKey: getUserKey
	}
}]);
