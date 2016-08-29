/*!
 * Mowe Swipe v0.7.5
 */

var Swipe = (function() {

	function Swipe(viewport) {

		var self = this;

		this.viewport = viewport;

		this.frames = [];

		this.resizeDelay = false;

		this.resizeDelayTime = 1000;

		this.clickCtrl = function() {

			for (var i = self.frames.length; i--; )
				self.frames[i].classList.remove('is-active');

			if (this.swipeTarget) this.swipeTarget.classList.add('is-active');

		};

		this.resizeDelayAction = function() {

			self.resize();

			// set false the resizeDelay
			self.resizeDelay = false;

		};

		this.resizeCtrl = function() {

			clearTimeout(self.resizeDelay);
			self.resizeDelay = false;
			self.resizeDelay = setTimeout(self.resizeDelayAction, self.resizeDelayTime);

		};

	}

	/**
	 * Get the bigger frame height value and give it to viewport height
	 */
	Swipe.prototype.resize = function() {

		this.viewport.style.height = 'auto';

		var bigger = 0;

		for (var i = this.frames.length; i--; )
			if (this.frames[i].offsetHeight > bigger)
				bigger = this.frames[i].offsetHeight;

		this.viewport.style.height = ( bigger ) + 'px';

	};

	Swipe.prototype.processItem = function(item) {

		item.item.swipeTarget = item.swipeTarget;
		addListener(item.item, 'click', 'onclick', this.clickCtrl, false);

	};

	Swipe.prototype.processItems = function(items) {

		for (var i = items.length; i--; )
			this.processItem(items[i]);

	};

	Swipe.prototype.getFrames = function() {

		var frames = this.viewport.querySelectorAll('.SwipeFrame');

		for (var i = frames.length; i--; )
			this.frames.push(frames[i]);

	};

	Swipe.prototype.init = function(items) {

		var self = this;

		this.getFrames();

		this.processItems(items);

		addListener(window, 'resize', 'onresize', this.resizeCtrl, false);
		this.resize();

	};

	return Swipe;

})();