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

//auth
function buildUrl(url) {
	url += url.indexOf('?') > -1 ? '&' : '?';
	url += 'client_id=37417a9f26c83617e3ff&client_secret=80a62ce7d29d61935e214ff68d3ab6509378e327';
	return url;
}


function getUsersFromOrg(page, size) {
	var defer = q.defer();

	var options = _.extend({}, DEFAULT_OPTIONS, {
		url : buildUrl(BASE_URL + '/orgs/'  + ORGANIZATION + '/members'  + '?page=' + page + '&per_page=' + size)
	});

	var detailsList = [];
	request.get(options, function (error, response) {
		if(error != undefined) return defer.reject(error);

		var list = (JSON.parse(response.body));

		var done = 0;
		list.forEach(function(element) {
			getUserDetail(element.login).then(function (data) {
				detailsList.push(data);
			}).finally(function () {
				++done;
				if (done === list.length) {
					defer.resolve(detailsList);
				}
			});
		});
	});

	return defer.promise;
}

function getUserDetail(username) {
	var defer = q.defer();

	var options = _.extend({}, DEFAULT_OPTIONS, {
		url : buildUrl(BASE_URL + '/users/' + username)
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
