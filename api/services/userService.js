var q = require('q');
var _ = require('lodash');
var githubRepo = require('../repositories/github');

function getOrgUsers(page, size) {
	if(page < 1 || size < 1) q.defer().reject('params fail');

	return githubRepo.getUsersFromOrg(page, size).then(function (data) {
		return responseData = _.map(data).map(function (element) {
			element.value = buildUserValue(element);
			return _.pick(element, ['login', 'id', 'html_url', 'avatar_url', 'value']);
		});
	});
}

function getUserDetails(username) {
	var defer = q.defer();

	githubRepo.getUserDetail(username).then(function(data) {
		data.value = buildUserValue(user);

		defer.resolve(data);
	});

	return defer.promise;
}

function buildUserValue(data) {
	return parseFloat(30 + ((data.public_repos || 0) * 0.75) +
		((data.public_gists || 0) * 0.5) +
		((data.followers || 0) * 0.1) +
		((data.following || 0) * 0.05)).toFixed(2);
}

var expose = {
	getOrgUsers : getOrgUsers,
	getUserDetails: getUserDetails
}

module.exports = expose;
