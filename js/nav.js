/* Nav */

var Nav = (function() {

	function Nav(items) {

		var self = this;

		this.items = items;

		this.itemClickCtrl = function() {

			scrollTo(this.scrollTarget.offsetTop);
			self.setActiveItem(this);

		};

	}

	Nav.prototype.setActiveItem = function(item) {

		for (var i = this.items.length; i--; )
			this.items[i].menuItem.classList.remove(this.items[i].menuItem.activeClass);

		item.classList.add(item.activeClass);

	};

	/**
	 * Add listeners and test the item
	 * @param {object} item
	 */
	Nav.prototype.processItem = function(item) {

		item.menuItem.scrollTarget = item.scrollTarget;
		item.menuItem.activeClass = item.activeClass;
		addListener(item.menuItem, 'click', 'onclick', this.itemClickCtrl, false);


	};

	/**
	 * Process the items list based on a items array
	 * @param {array} items
	 */
	Nav.prototype.processItems = function(items) {

		var arr = [];

		for (var i = items.length; i--; )
			arr.push(this.processItem(items[i]));

	};

	Nav.prototype.init = function() {

		this.processItems(this.items);

	};

	return Nav;

})();