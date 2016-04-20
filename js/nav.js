/* Nav */

var Nav = (function() {

	function Nav(items, target) {

		var self = this;

		this.items = items;
		this.target = target;

		/**
		 * Controller to scroll events
		 * @param {object} ev
		 */
		this.scrollCtrl = function(ev) {

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

		if (item) {
			this.target.setAttribute('data-target', item.getAttribute('data-target'));
			item.classList.add(item.activeClass);
		} else {
			this.target.setAttribute('data-target', '');
		}

	};

	/**
	 * Process the items list based on a items array
	 * @param {Array} items
	 */
	Nav.prototype.processItems = function(items) {

		for (var i = items.length; i--; )
			items[i] = new NavItem(items[i]);

	};

	Nav.prototype.init = function() {

		this.processItems(this.items);

		// add window scroll listener
		//addListener(window, 'scroll', 'onscroll', this.scrollCtrl, false);

	};

	return Nav;

})();