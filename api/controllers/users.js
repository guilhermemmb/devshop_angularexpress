var express = require('express');
var router = express.Router();
var userService = require('../services/userService');

router.get('/getAll', function(req, res, next) {
	var page = req.query.page || 1;
	var size = req.query.size || 30;

	userService.getOrgUsers(page, size).then(function (data) {
		res.json(data);
	}, function (err) {
		res.status(500).send(JSON.stringify(err));
	});

});

module.exports = router;
