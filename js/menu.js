
/* Menu */

var Menu = (function () {

	/**
	 * Menu constructor
	 * @constructor
	 */
	function Menu(element) {

		var self = this;

		this.element = element;

		this.config = {
			elementClass: 'Menu',
			elementBorderClass: 'has-border',
			itemSelector: '.MenuItem'
		};

		this.items = [];

		this.onItemClick = function (item) {

			self.setActiveItem(item);

		};

		if (this.element)
			this.init();

	}

	Menu.prototype.getActiveItem = function () {

		for (var i = this.items.length; i--; )
			if (this.items[i].isActive())
				return this.items[i];

		return false;

	};

	Menu.prototype.setActiveItem = function (item) {

		var activeItem = item || this.getActiveItem();

		this.resetItems();

		activeItem.setActive(true);

		this.defineBorders();

	};

	Menu.prototype.defineBorders = function () {

		var activeItem = false;

		for (var i = this.items.length; i--; ) {

			if (this.items[i].isActive())
				activeItem = this.items[i];

			if (!activeItem)
				this.items[i].element.classList.remove(this.config.elementBorderClass);
			else
				this.items[i].element.classList.add(this.config.elementBorderClass);

		}

	};

	Menu.prototype.resetItems = function () {

		for (var i = this.items.length; i--; ) {
			this.items[i].reset();
		}

	};

	Menu.prototype.getItems = function () {

		var items = document.querySelectorAll(this.config.itemSelector);

		for (var i = items.length; i--; ) {

			var item = new MenuItem(items[i]);
			item.onClick.listeners.push(this.onItemClick);

			this.items.push(item);

		}

	};

	Menu.prototype.init = function () {

		this.getItems();
		var active = this.getActiveItem();

		if (active)
			this.setActiveItem(active);

	};

	return Menu;

})();