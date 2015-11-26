/* Nav */

var Nav = (function() {

	function Nav(items) {

		var self = this;

		this.items = items;

		/**
		 * Controller to item click events
		 */
		this.itemClickCtrl = function() {

			// scroll to scrollTarget element based on his offsetTop value
			scrollTo(this.scrollTarget.offsetTop);

		};

		/**
		 * Controller to scroll events
		 * @param event
		 */
		this.scrollCtrl = function(event) {

			var x = false;

			for (var i = self.items.length; i--; )
				if (self.items[i].scrollTarget.offsetTop - 50 < window.scrollY)
					x = !!x ? ( (x.offsetTop < self.items[i].scrollTarget.offsetTop) ? self.items[i].scrollTarget : x ) : self.items[i].scrollTarget;

			// Set the active item based on x
			self.setActiveItem(x ? x.menuItem : false);

		};

	}

	/**
	 * Remove the active class from all element and just add this class to the active item
	 * @param {object|boolean} item
	 */
	Nav.prototype.setActiveItem = function(item) {

		for (var i = this.items.length; i--; )
			this.items[i].menuItem.classList.remove(this.items[i].menuItem.activeClass);

		if (item) item.classList.add(item.activeClass);

	};

	/**
	 * Add listeners and test the item
	 * @param {object} item
	 */
	Nav.prototype.processItem = function(item) {

		item.menuItem.scrollTarget = item.scrollTarget;
		item.menuItem.activeClass = item.activeClass;
		item.scrollTarget.menuItem = item.menuItem;
		addListener(item.menuItem, 'click', 'onclick', this.itemClickCtrl, false);

	};

	/**
	 * Process the items list based on a items array
	 * @param {Array} items
	 */
	Nav.prototype.processItems = function(items) {

		var arr = [];

		for (var i = items.length; i--; )
			arr.push(this.processItem(items[i]));

	};

	Nav.prototype.init = function() {

		this.processItems(this.items);

		// add window scroll listener
		addListener(window, 'scroll', 'onscroll', this.scrollCtrl, false);

	};

	return Nav;

})();