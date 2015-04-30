var q = require('q');
var request = require('request');
var _ = require('lodash');

var ORGANIZATION = 'Netflix';
var BASE_URL = 'https://api.github.com';

var DEFAULT_OPTIONS = {
	headers : {
		'Accept': 'application/vnd.github.full+json',
		'User-Agent': 'guilhermemmb'
	}
};

function getUsersFromOrg(page, size) {
	var defer = q.defer();

	var options = _.extend({}, DEFAULT_OPTIONS, {
		url : BASE_URL + '/orgs/'  + ORGANIZATION + '/members'  + '?page=' + page + '&per_page=' + size
	});

	request.get(options, function (error, response) {
		if(error != undefined) return defer.reject(error);

		defer.resolve(JSON.parse(response.body));
	});

	return defer.promise;
}

var expose = {
	getUsersFromOrg : getUsersFromOrg
}

module.exports = expose;

