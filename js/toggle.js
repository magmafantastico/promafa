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

	}

	Toggle.prototype.open = function() {

		this.isActive = true;
		this.viewport.classList.add('is-active');
		this.nav.viewport.classList.add('is-active');

	};

	Toggle.prototype.close = function() {

		this.isActive = false;
		this.viewport.classList.remove('is-active');
		this.nav.viewport.classList.remove('is-active');

	};

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