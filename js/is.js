/*!
 * Mowe is.js v1.0.0 (http://letsmowe.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var is = {
	portrait: function() {
		// plus 1 add preference to portrait mode
		return window.innerHeight + 1 > window.innerWidth;
	},
	mobile: {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
		}
	},
	any: function() {
		return (this.portrait() || this.mobile.any())
	}
};

/**
 * Add or remove the class based on size of screen or the user agent
 */
is.windowResizeCtrl = function() {

	var _ = document.documentElement;
	_.is = _.is || {};

	// ctrl the class portrait and landscape
	// if the var _.is.portrait is true, doesn't need to add the class (+ fast function)
	if (is.portrait()) {
		if (!_.is.portrait) {
			_.classList.add('is-portrait');
			_.classList.remove('is-landscape');
		}
		_.is.portrait = true;
	} else {
		if (_.is.portrait) {
			_.classList.remove('is-portrait');
			_.classList.add('is-landscape');
		}
		_.is.portrait = false;
	}

};

/**
 * Init the is.js listeners and vars
 */
is.init = function() {

	var _ = document.documentElement;
	_.is = _.is || {};

	// ctrl the class mobile
	// if the var _.is.mobile is true, doesn't need to add the class (+ fast function)
	if (is.mobile.any()) {
		if (!_.is.mobile) _.classList.add('is-mobile');
		_.is.mobile = true;
	} else {
		if (!_.is.mobile) _.classList.remove('is-mobile');
		_.is.mobile = false;
	}

	// fall back to add the class
	_.is.portrait = !is.portrait();

	if (window.addEventListener)
		window.addEventListener('resize', is.windowResizeCtrl, false);
	else window.attachEvent('onresize', is.windowResizeCtrl);

	is.windowResizeCtrl();

};

(function(){
	// initialize all the piece of shit
	is.init();
})();