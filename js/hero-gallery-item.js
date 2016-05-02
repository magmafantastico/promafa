
/* Hero Gallery item */

var HeroGalleryItem = (function () {

	/**
	 * Hero Gallery item constructor
	 * @param {Element} viewport
	 * @param {Element} gallery
	 * @constructor
	 */
	function HeroGalleryItem(viewport, gallery) {

		var self = this;

		this.viewport = viewport;
		this.gallery = gallery;

		this.config = {
			activeClass: 'is-active',
			backgroundSelector: '.HeroGalleryItem-background',
			backgroundImgSelector: '.HeroGalleryItem-background img',
			innerSelector: '.HeroGalleryItem-inner',
			viewportSelector: '.HeroGalleryItem',
			isFadeInClass: 'is-fade-in',
			isFadeInDelay: 4000,
			isFadeOutClass: 'is-fade-out',
			isFadeOutDelay: 1000
		};

		/* Controllers */

		this.isActive = false;

		this.active = function () {

			self.isActive = true;

			self.viewport.classList.add(self.config.activeClass);
			self.viewport.classList.add(self.config.isFadeInClass);

			setTimeout(function () {

				self.viewport.classList.remove(self.config.isFadeInClass);
				self.viewport.classList.add(self.config.isFadeOutClass);

				setTimeout(function () {

					self.viewport.classList.remove(self.config.isFadeOutClass);

				}, self.config.isFadeInDelay);

			}, self.config.isFadeInDelay);

		};

		this.inactive = function () {

			this.isActive = false;

			this.viewport.classList.remove(this.config.activeClass);

		};

		if (this.viewport)
			this.init();

	}

	/**
	 * Get Hero Gallery Item Inner
	 */
	HeroGalleryItem.prototype.getInner = function () {

		this.inner = this.viewport.querySelector(this.config.innerSelector);

	};

	/**
	 * Set Hero Gallery Item Background Image property
	 * The value is based on Background Image Element src
	 */
	HeroGalleryItem.prototype.setBackgroundImage = function () {

		this.background.style.backgroundImage = 'url(' + this.background.img.src + ')';
		this.background.img.classList.add('is-hide');

	};

	/**
	 * Get Hero Gallery Item Background Image element
	 */
	HeroGalleryItem.prototype.getBackgroundImage = function () {

		this.background.img = this.background.querySelector(this.config.backgroundImgSelector);

		if (this.background.img)
			this.setBackgroundImage();

	};

	/**
	 * Get Hero Gallery Item Background
	 */
	HeroGalleryItem.prototype.getBackground = function () {

		this.background = this.viewport.querySelector(this.config.backgroundSelector);

		if (this.background)
			this.getBackgroundImage();

	};

	/**
	 * Normalize this
	 */
	HeroGalleryItem.prototype.normalize = function () {

		this.getBackground();
		this.getInner();

	};

	/**
	 * Init this
	 */
	HeroGalleryItem.prototype.init = function () {

		// give to viewport Node a instance of this
		if (!this.viewport.HeroGalleryItem)
			this.viewport.HeroGalleryItem = this;

		// discover the current active state (if has 'is-active' class)
		this.isActive = !!this.viewport.classList.contains(this.config.activeClass);

		this.normalize();

	};

	return HeroGalleryItem;

})();