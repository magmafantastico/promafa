var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	tinypng = require('gulp-tinypng');

var cssFiles = 'css/*.css',
	jsFiles = 'js/*.js',
	imgfiles = 'img/*';

gulp.task('css', function() {
	gulp.src(cssFiles)
		.pipe(concat('villa.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(minifycss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('dist/css'));
	gulp.src([core, cssCross])
		.pipe(concat('villa-cross.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(minifycss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('tinypng', function () {
	gulp.src(imgfiles)
		.pipe(tinypng('8eNoFlUv4wHzam_8GleKHdhH2YFk9xAd'))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('default', function() {
	var villa = ['css', 'js'];
	gulp.watch(villa);
});