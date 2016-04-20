var gulp = require('gulp'),
	concat = require('gulp-concat'),
	cleanCss = require('gulp-clean-css'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	imageResize = require('gulp-image-resize'),
	tinypng = require('gulp-tinypng'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

/*
 * To use the gulp-image-resize, it needs of some dependencies:
 * https://www.npmjs.com/package/gulp-image-resize
 *
 * Or, install:
 *
 * Ubuntu:
 * apt-get install imagemagick
 * apt-get install graphicsmagick
 *
 * Mac:
 * brew install imagemagick
 * brew install graphicsmagick
 *
 * Windows & others:
 * http://www.imagemagick.org/script/binary-releases.php
 *
 * */

var tinypngToken = '8eNoFlUv4wHzam_8GleKHdhH2YFk9xAd';

var dist = {
	location: 'dist/'
};

dist.css = {
	location: dist.location + 'css/'
};

dist.js = {
	location: dist.location + 'js/'
};

var css = {
	content: '*.css',
	location: 'css/'
};

var js = {
	content: '*.js',
	location: 'js/'
};

var images = {
	content: '*',
	location: 'img/'
};

images.src = {
	content: '*',
	location: images.location + 'src/'
};

images.largePhotos = {
	content: '*',
	location: images.location + 'largePhotos/'
};

images.verticalPhotos = {
	content: '*',
	location: images.location + 'verticalPhotos/'
};

images.headerPhotos = {
	content: '*',
	location: images.location + 'headerPhotos/'
};

images.widePhotos = {
	content: '*',
	location: images.location + 'widePhotos/'
};

images.thumbs = {
	content: '*',
	location: images.location + 'thumbs/'
};

gulp.task('distImages', function () {
	gulp.src(images.location + images.content)
		.pipe(gulp.dest(dist.location + images.location));
});

gulp.task('resizeLargePhotos', function () {
	gulp.src(images.largePhotos.location + images.largePhotos.content)
		.pipe(imageResize({
			height : 768,
			upscale : false
		}))
		.pipe(gulp.dest(dist.location + images.largePhotos.location));
});

gulp.task('resizeVerticalPhotos', function () {
	gulp.src(images.verticalPhotos.location + images.verticalPhotos.content)
		.pipe(imageResize({
			height : 960,
			upscale : false
		}))
		.pipe(gulp.dest(dist.location + images.verticalPhotos.location));
});

gulp.task('resizeHeaderPhotos', function () {
	gulp.src(images.headerPhotos.location + images.headerPhotos.content)
		.pipe(imageResize({
			height : 1080,
			upscale : false
		}))
		.pipe(gulp.dest(dist.location + images.headerPhotos.location));
});

gulp.task('resizeWidePhotos', function () {
	gulp.src(images.widePhotos.location + images.widePhotos.content)
		.pipe(imageResize({
			height : 576,
			upscale : false
		}))
		.pipe(gulp.dest(dist.location + images.widePhotos.location));
});

/**
 * The original image need to be 1200x600 (1:2)
 */
gulp.task('resizeThumbs', function () {
	gulp.src(images.thumbs.location + images.thumbs.content)
		.pipe(imageResize({
			height : 630,
			upscale : false
		}))
		.pipe(gulp.dest(dist.location + images.thumbs.location));
});

// tiny the new images at the 'src' folder
gulp.task('tinySource', function () {
	gulp.src(images.src.location + images.src.content)
		.pipe(tinypng(tinypngToken))
		.pipe(gulp.dest(images.src.location));
});

gulp.task('css', function() {
	gulp.src(css.location + css.content)
		.pipe(concat('promafa.css'))
		.pipe(gulp.dest(dist.css.location));
	gulp.src(dist.css.location + 'promafa.css')
		.pipe(minifycss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(dist.css.location));
});

gulp.task('js', function() {
	gulp.src(js.location + js.content)
		.pipe(concat('promafa.js'))
		.pipe(gulp.dest(dist.js.location));
});

gulp.task('css-watch', ['css'], function () {
	browserSync.reload();
});

gulp.task('js-watch', ['js'], function () {
	browserSync.reload();
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

	// Serve files from the root of this project
	browserSync.init({
		server: {
			baseDir: "./",
			index: "index.html",
			routes: {
				"/institucional": "./index.html",
				"/produtos": "./index.html",
				"/representantes": "./index.html",
				"/contato": "./index.html",
				"/como-chegar": "./index.html"
			}
		}
	});

	gulp.watch([css.location + css.content], ['css-watch']);
	gulp.watch([js.location + js.content], ['js-watch']);
	gulp.watch("*.html").on("change", reload);

});

gulp.task('default', ['serve']);