/* Toggle */

var Toggle = (function(){

	function Toggle(viewport, nav) {

		var self = this;

		this.viewport = viewport;

		this.nav = {};
		this.nav.viewport = nav;

		this.isActive = false;

		this.clickCtrl = function() {

			self.toggle();

		};

		this.open = function() {

			self.isActive = true;
			self.viewport.classList.add('is-active');
			self.nav.viewport.classList.add('is-active');

		};

		this.close = function() {

			self.isActive = false;
			self.viewport.classList.remove('is-active');
			self.nav.viewport.classList.remove('is-active');

		};

	}

	Toggle.prototype.toggle = function() {

		if (this.isActive) this.close();
		else this.open();

	};

	Toggle.prototype.init = function() {

		this.close();

		addListener(this.viewport, 'click', 'onclick', this.clickCtrl, false);

	};

	return Toggle;

})();