/* Hero Gallery Slider */

var HeroGallerySlider = (function () {

	/**
	 * Hero Gallery Slider constructor
	 * @constructor
	 */
	function HeroGallerySlider(gallery) {

		var self = this;

		this.gallery = gallery;

		this.config = {
			activeClass: 'is-active',
			delayTime: 5000 /* ( fade in delay  + fade out delay ) */
		};

		this.activeItem = false;
		this.interval = false;

		/* Controller Interfaces */

		this.delay = function () {

			self.change();

		};

		this.start = this.startController;
		this.resume = this.resumeController;
		this.pause = this.pauseController;
		this.stop = this.stopController;
		this.change = this.changeController;

		if (this.gallery)
			this.init();

	}

	/**
	 * Delay (timer) init
	 */
	HeroGallerySlider.prototype.delayInit = function () {

		this.interval = setTimeout(this.delay, this.config.delayTime);

	};

	/**
	 * Delay (timer) clear
	 */
	HeroGallerySlider.prototype.delayClear = function () {

		if (this.interval)
			clearInterval(this.interval);

	};

	/**
	 * Delay (timer) reseter
	 * @param {boolean} pause
	 */
	HeroGallerySlider.prototype.delayController = function (pause) {

		this.delayClear();

		if (!pause)
			this.delayInit();

	};

	/**
	 * Control the start of slider
	 */
	HeroGallerySlider.prototype.startController = function () {

		this.normalize(this.getFirst());
		this.delayController(false);

	};

	/**
	 * Control the pause of slider
	 */
	HeroGallerySlider.prototype.pauseController = function () {

		this.delayController(true);

	};

	/**
	 * Control the stop of slider
	 */
	HeroGallerySlider.prototype.stopController = function () {

		this.normalize(this.getFirst());
		this.delayController(true);

	};

	/**
	 * Control of the resume of slider
	 */
	HeroGallerySlider.prototype.resumeController = function () {

		this.delayController(false);

	};

	/**
	 * Control the slider change
	 */
	HeroGallerySlider.prototype.changeController = function () {

		this.normalize(this.getNext());
		this.delayController(false);

	};

	/**
	 * Return the next slide
	 * @return {*}
	 */
	HeroGallerySlider.prototype.getNext = function () {

		for (var i = 0; i < this.gallery.items.length; i++)
			if (this.gallery.items[i].isActive) {

				if (i == this.gallery.items.length - 1)
					return this.gallery.items[0];
				else
					return this.gallery.items[i + 1];

			}

		return false;

	};

	/**
	 * Return the first slide
	 * @return {*}
	 */
	HeroGallerySlider.prototype.getFirst = function () {

		if (this.isGalleryItem(this.gallery.items[0]))
			return this.gallery.items[0];

		return false;

	};

	/**
	 * Return the active (valid) slider
	 * If have more than one active slide, return the first slide
	 * @return {*}
	 */
	HeroGallerySlider.prototype.getActive = function () {

		if (this.activeItem)
			return this.activeItem;

		for (var i = 0; i < this.gallery.items.length; i++)
			if (this.gallery.items[i].isActive)
				return this.gallery.items[i];

		if (this.gallery.items[0])
			return this.gallery.items[0];

		return false;

	};

	/**
	 * Return a true Gallery Item
	 * @param {object} item
	 * @return {*}
	 */
	HeroGallerySlider.prototype.isGalleryItem = function (item) {

		if (item)
			if (item.active && item.inactive)
				return item;

		return false;

	};

	/**
	 * Normalize the gallery items state
	 * @param next
	 */
	HeroGallerySlider.prototype.normalize = function (next) {

		for (var i = this.gallery.items.length; i--;)
			this.gallery.items[i].inactive();

		if (this.isGalleryItem(next))
			next.active();

	};

	/**
	 * Init this
	 */
	HeroGallerySlider.prototype.init = function () {

		this.normalize(this.isGalleryItem(this.getActive()));
		this.start();

	};

	return HeroGallerySlider;

})();