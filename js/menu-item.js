
/* MenuItem */

var MenuItem = (function () {

	/**
	 * MenuItem constructor
	 * @constructor
	 */
	function MenuItem(element) {

		var self = this;

		this.element = element;

		this.config = {
			activeClass: 'is-active',
			elementClass: 'MenuItem'
		};

		this.isActive = function () {

			if (self.element)
				return !!self.element.classList.contains(self.config.activeClass);

		};

		this.onClick = function () {

			for (var i = 0; i < self.onClick.listeners.length; i++) {

				self.onClick.listeners[i](self);

			}

		};

		this.onClick.listeners = [];

		if (element)
			this.init();

	}

	MenuItem.prototype.setActive = function (state) {

		if (state)
			this.element.classList.add(this.config.activeClass);
		else
			this.element.classList.remove(this.config.activeClass);

	};

	MenuItem.prototype.addListeners = function () {

		try {

			this.element.addEventListener('click', this.onClick, false);

		} catch (e) {

			this.element.attachEvent('click', this.onClick);

		}

	};

	MenuItem.prototype.reset = function () {

		this.setActive(false);

	};

	MenuItem.prototype.normalize = function () {

		this.element.classList.add(this.config.elementClass);

	};

	MenuItem.prototype.init = function () {

		this.normalize();
		this.addListeners();

	};

	return MenuItem;

})();