/* Local */

var Local = (function() {

	function Local(map, modal, trigger) {

		var self = this;

		this.map = map;
		this.modal = modal;
		this.trigger = trigger;

		this.mapInited = false;

		this.triggerClickCtrl = function() {

			self.open();

		};

	}

	Local.prototype.initMap = function() {

		var self = this;

		this.mapInited = true;

		setTimeout(function() {

			self.map.init();

		}, 1200);

	};

	Local.prototype.open = function() {

		this.modal.open();

		if (!this.map.mapInited) this.initMap();

	};

	Local.prototype.init = function() {

		addListener(this.trigger, 'click', 'onclick', this.triggerClickCtrl, false);

	};

	return Local;

})();