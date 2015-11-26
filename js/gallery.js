/*!
 * Mowe Gallery v1.0.0 (http://letsmowe.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var Gallery = (function () {

	/**
	 * The constructor
	 * @constructor
	 */
	function Gallery() {

		var self = this;

		this.main = document.getElementById('main');
		this.viewport = document.getElementById('hero');
		this.gallery = document.getElementById('hero-gallery');

		this.slides = this.gallery.querySelectorAll('.GalleryContent');

		/**
		 * Get, update and set the current to next slide
		 */
		this.nextSlide = function () {

			var c, n, i;

			if (c = self.getCurrent(true)) {

				i = ( c.index == self.slides.length - 1 ) ? 0 : c.index + 1;
				n = self.slides[i];
				n.index = i;

				self.setCurrent(self.updateCurrent(n));

			}

			self.translateSlides();
			self.initInfiniteLoop();

		};

		/**
		 * Controller of click and touch events
		 */
		this.ctrlClick = function () {

			if (self.allowClick) self.nextSlide();

		};

		/**
		 * Controller of size of gallery and slides
		 * Also do a nextSlide function after 1200 milliseconds
		 */
		this.ctrlResize = function () {

			setTimeout(function () {
				self.resizeGallery();
				self.resizeSlides();
			}, 400);

			self.initInfiniteLoop(1200);

		};

	}

	/**
	 * Get the current slide
	 * @param {boolean|undefined} remove
	 * @return {object} current
	 */
	Gallery.prototype.getCurrent = function (remove) {

		var c, n;

		for (var i = this.slides.length; i--;)
			if (this.slides[i].classList.contains('current')) {
				if (remove) this.slides[i].classList.remove('current');
				c = this.slides[i];
				c.index = i;
			}

		if (!c) {
			n = this.slides[0];
			n.index = 0;
		}

		return n ? n : c;

	};

	/**
	 * Current Setter
	 * @param {object} current
	 * @return {object} current
	 */
	Gallery.prototype.setCurrent = function (current) {

		this.current = current;

	};

	/**
	 * Current Update Class
	 * @param {object} current
	 * @return {object} current
	 */
	Gallery.prototype.updateCurrent = function (current) {

		current.classList.add('current');
		return current;

	};

	/**
	 * Set the slide translate property (webkit and ie9 support)
	 * @param {object} a element
	 * @param {number} b width
	 */
	Gallery.prototype.setSlideTranslate = function (a, b) {
		a.style.transform = 'translateX(' + b + 'px)';
		a.style.webkitAlignContent = 'translateX(' + b + 'px)';
		a.style.msTransform = 'translateX(' + b + 'px)';
	};

	/**
	 * Do the slide translate
	 */
	Gallery.prototype.translateSlides = function () {

		var self = this;

		var c, w;

		this.allowClick = false;

		c = this.current.index;
		w = this.current.offsetWidth;

		for (var i = this.slides.length; i--;)
			this.setSlideTranslate(this.slides[i], ( i - c ) * w);

		setTimeout(function () {
			self.allowClick = true;
		}, 700);

	};

	/**
	 * Resize the .gallery-content
	 */
	Gallery.prototype.resizeSlides = function () {

		for (var i = this.slides.length; i--;)
			this.slides[i].style.width = this.viewport.offsetWidth + 'px';

	};

	/**
	 * Resize the .gallery
	 */
	Gallery.prototype.resizeGallery = function () {

		var h, w;

		//h = this.viewport.offsetWidth * .7;
		h = this.viewport.offsetHeight;
		w = this.viewport.offsetWidth * this.slides.length;

		if (h > window.innerHeight) h = window.innerHeight;

		this.gallery.style.height = h + 'px';
		this.gallery.style.width = w + 'px';

	};

	/**
	 * Controller the global interval function
	 */
	Gallery.prototype.initInfiniteLoop = function (interval) {

		var self = this;

		if (interval) {

			if (this.infiniteLoop)
				clearInterval(this.infiniteLoop);

			this.infiniteLoop = setTimeout(function() {
				self.nextSlide();
				self.doInfiniteLoop();
			}, interval);

		} else this.doInfiniteLoop();

	};

	/**
	 * Do the infinite loop
	 */
	Gallery.prototype.doInfiniteLoop = function () {

		var self = this;

		if (self.infiniteLoop) clearInterval(self.infiniteLoop);

		self.loopInterval = 5000;
		self.infiniteLoop = setInterval(self.nextSlide, self.loopInterval);

	};

	/**
	 * Init the gallery
	 */
	Gallery.prototype.init = function () {

		var self = this;

		this.current = this.updateCurrent(this.getCurrent(true));

		addListener(this.viewport, 'click', 'onclick', self.ctrlClick, false);

		this.loopInterval = 6000;
		addListener(window, 'resize', false, self.ctrlResize, false);

		this.resizeGallery();
		this.resizeSlides();
		this.translateSlides();

		self.initInfiniteLoop();

	};

	return Gallery;

})();