
/* Nav Item */

var NavItem = (function () {

	/**
	 * Nav Item constructor
	 * @constructor
	 */
	function NavItem(item) {

		var self = this;

		this.menuItem = item.menuItem;
		this.scrollTarget = item.scrollTarget;
		this.activeClass = item.activeClass;
		this.after = item.after;

		/**
		 * Controller to item click events
		 */
		this.onClick = function() {

			// scroll to scrollTarget element based on his offsetTop value
			scrollTo(this.scrollTarget.offsetTop);

			if (self.after)
				self.after();

		};

		if (this.menuItem)
			this.init();

	}

	NavItem.prototype.init = function () {

		this.menuItem.scrollTarget = this.scrollTarget;
		this.scrollTarget.menuItem = this.menuItem;

		addListener(this.menuItem, 'click', 'onclick', this.onClick, false);

	};

	return NavItem;

})();