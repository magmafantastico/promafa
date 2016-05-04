
/* Hero Gallery */

var HeroGallery = (function () {

	/**
	 * Hero Gallery constructor
	 * @param {Element} viewport
	 * @constructor
	 */
	function HeroGallery(viewport) {

		var self = this;

		this.viewport = viewport;

		this.config = {
			viewportSelector: '.HeroGallery',
			itemSelector: '.HeroGalleryItem'
		};

		this.slider = new HeroGallerySlider();

		this.onClick = function () {

			self.slider.change();

		};

		if (this.viewport)
			this.init();

	}

	/**
	 * Init Gallery Slider
	 */
	HeroGallery.prototype.initSlider = function () {

		this.slider.gallery = this;
		this.slider.init();

	};

	/**
	 * Init Gallery Items
	 */
	HeroGallery.prototype.initGalleryItems = function () {

		var items = [this.items.length];

		for (var i = this.items.length; i--; )
			items[i] = new HeroGalleryItem(this.items[i], this);

		this.items = items;

	};

	/**
	 * Get Gallery Items and normalize them
	 */
	HeroGallery.prototype.getGalleryItems = function () {

		this.items = this.viewport.querySelectorAll(this.config.itemSelector);

	};

	/**
	 * Normalize this
	 */
	HeroGallery.prototype.normalize = function (first) {

		this.getGalleryItems();
		this.initGalleryItems();

	};

	/**
	 * Init this
	 */
	HeroGallery.prototype.init = function () {

		// give to viewport Node a instance of this
		if (!this.viewport.HeroGallery)
			this.viewport.HeroGallery = this;

		// normalize the gallery and the items
		this.normalize();

		// init and start the slider
		this.initSlider();

	};

	return HeroGallery;

})();