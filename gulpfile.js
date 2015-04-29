'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');

var JS_LIB_DEST = './public/javascripts/libs/';
var CSS_LIB_DEST = './public/stylesheets/';

gulp.task('jslibs', function() {
	gulp.src('./bower_components/**/*.min.js')
		.pipe(rename(function (path) {
			path.dirname = '';
		}))
		.pipe(gulp.dest(JS_LIB_DEST));
	gulp.src('./bower_components/**/dist/js/*.min.js')
		.pipe(rename(function (path) {
			path.dirname = '';
		}))
		.pipe(gulp.dest(JS_LIB_DEST));
}).task('csslibs', function () {
	gulp.src('./bower_components/**/dist/css/*.min.css')
		.pipe(rename(function (path) {
			path.dirname = '';
		}))
		.pipe(gulp.dest(CSS_LIB_DEST));

	gulp.src('./bower_components/**/dist/fonts/*')
		.pipe(rename(function (path) {
			path.dirname = '';
		}))
		.pipe(gulp.dest(CSS_LIB_DEST));
});

gulp.task('default',['jslibs','csslibs']);
