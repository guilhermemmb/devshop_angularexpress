var express = require('express');
var _ = require('lodash');
var glob = require('glob');
var router = express.Router();

router.get('/', function (req, res, next) {

	var statics = getStatics();

	res.render('layout', {
		statics: {
			jsLibs: statics.jsLibs,
			jsApp: statics.jsApp,
			css: statics.css
		}
	});
});

var getStatics = (function () {
	var obj = {jsLibs: undefined, jsApp: undefined, css: undefined};
	var globOpts = {cwd: process.cwd() + '/public'};

	return function () {
		//if(!obj.jsLibs || !obj.jsApp || !obj.css) {
		obj.jsLibs = glob.sync('./javascripts/libs/**/*.js', globOpts);
		obj.jsApp = glob.sync('./javascripts/app/**/*.js', globOpts);
		obj.css = glob.sync('./stylesheets/*.css', globOpts);
		//}

		obj.jsLibs = setLibOrder(obj.jsLibs);

		return obj;
	}

})();

function setLibOrder(list) {
	var order = ['angular.min.js', 'jquery.min.js'];

	var orderedList = [];
	order.forEach(function (js) {
		var idx = -1;
		list.forEach(function (el, index) {
			var foundIndex = el.indexOf(js);
			if (foundIndex > -1) {
				idx = index;
				return false;
			}
		});

		if (idx > -1) {
			orderedList.push(_.pullAt(list, idx));
		}
	});

	return _.union(orderedList, list);
}

module.exports = router;
