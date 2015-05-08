var userService = require('../services/userService');

function getAll(req, res) {
	var page = req.query.page;
	var size = req.query.size;

	if(!page || page < 1) {
		res.status(400).send("invalid page");
		return;
	}

	if(!size || size < 1) {
		res.status(400).send("invalid page size");
		return;
	}

	var size = req.query.size;

	userService.getOrgUsers(page, size).then(function (data) {
		res.json(data);
	}, function (err) {
		res.status(500).send(JSON.stringify(err));
	});
};

module.exports = {
	getAll: getAll
};
