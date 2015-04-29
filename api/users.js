var express = require('express');
var router = express.Router();
var q = require('q');
var _ = require('lodash');
var githubRepo = require('../repositories/github');

router.get('/getAll', function(req, res, next) {
	githubRepo.getUsersFromOrg().then(function (data) {
		var responseData = _.map(data).map(function (element) {
			return _.pick(element, ['login', 'id', 'url', 'avatar_url']);
		});

		res.json(responseData);
	}, function (err) {
		res.status(500).send(JSON.stringify(err));
	});
});

module.exports = router;
