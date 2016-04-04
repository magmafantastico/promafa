/* Mowe Next.js */

/**
 * The Next.js gives a transition frame to go to a next page
 */
var Next = (function() {

	function Next(trigger, frame, options) {

		var self = this;

		this.trigger = trigger;
		this.frame = frame;
		this.options = options;

		this.animationTimeDelay = this.options.animationTimeDelay || 500;
		this.animationTime = this.options.animationTime || 500;
		this.aniationTimeDelay = 50;

		this.isActive = false;

		this.clickCtrl = function() {

			self.initTransition();

		}

	}

	/**
	 * Go to the next page (based on url)
	 */
	Next.prototype.next = function() {

		if (this.options.url) {

			var self = this;
			var url = this.options.url;

			setTimeout(function() {

				window.location.href = url;

			}, ( this.animationTimeDelay + this.aniationTimeDelay ));

		}

	};

	Next.prototype.activeFrame = function() {

		var self = this;

		if (this.frame) {

			this.isActive = true;

			this.frame.classList.add('is-active');

			setTimeout(function() {
				self.frame.classList.add('is-visible');
			}, this.aniationTimeDelay);

		}

	};

	Next.prototype.disableFrame = function() {

		if (this.isActive)
			if (this.frame) {
				this.frame.classList.remove('is-active');
				this.frame.classList.remove('is-visible');
			}

	};

	Next.prototype.initTransition = function() {

		this.activeFrame();
		this.next();

	};

	Next.prototype.init = function() {

		var self = this;

		addListener(window, 'focus', 'onfocus', function() {
			self.disableFrame();
		}, false);

		if (this.trigger) addListener(this.trigger, 'click', 'onclick', this.clickCtrl, false);

	};

	Next.prototype.initAndDestroy = function() {

		var self = this;

		this.init();

		if (this.frame) {

			self.frame.classList.add('is-fading');

			setTimeout(function() {
				self.frame.classList.remove('is-visible');
			}, this.animationTimeDelay);

			setTimeout(function() {
				self.frame.classList.remove('is-active');
				self.frame.classList.remove('is-fading');
			}, this.animationTime);

		}

	};

	return Next;

})();