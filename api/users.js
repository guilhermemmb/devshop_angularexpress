var express = require('express');
var router = express.Router();
var q = require('q');
var _ = require('lodash');
var githubRepo = require('../repositories/github');

router.get('/getAll', function(req, res, next) {
	var page = req.params.page || 1;
	var size = req.params.size || 30;

	githubRepo.getUsersFromOrg(page, size).then(function (data) {
		var responseData = _.map(data).map(function (element) {
			return _.pick(element, ['login', 'id', 'html_url', 'avatar_url']);
		});

		res.json(responseData);
	}, function (err) {
		res.status(500).send(JSON.stringify(err));
	});
});

module.exports = router;
