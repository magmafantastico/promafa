/* Mowe Google Maps Controller */

var Maps = (function() {

	var styleArray = [
		{
			featureType: "all",
			stylers: [
				{ saturation: -80 }
			]
		},{
			featureType: "road.arterial",
			elementType: "geometry",
			stylers: [
				{ hue: "#00ffee" },
				{ saturation: 50 }
			]
		},{
			featureType: "poi",
			stylers: [
				{ visibility: "on" }
			]
		}
	];

	/**
	 * The constructor of Mowe Maps
	 * @param viewport {object}
	 * @param apiScript {object}
	 * @param options {object}
	 * @param loadScriptFunction {function} optional
	 * @constructor Maps
	 */
	function Maps(viewport, apiScript, options, loadScriptFunction) {

		var self = this;

		this.viewport = viewport;
		this.apiScript = apiScript;
		this.options = options;

		this.apiScriptURL = 'https://maps.googleapis.com/maps/api/js';

		this.loadScriptFunction = loadScriptFunction;

		this.scriptLoadCtrl = function() {

			self.addDefaultOptions();

			if (self.loadScriptFunction)
				self.loadScriptFunction();
			else self.initMap();

		};

	}

	Maps.prototype.initMap = function() {

		console.log('starting map');

		console.log(this.options);

		this.map = new google.maps.Map(this.viewport, this.options);

	};

	Maps.prototype.addDefaultOptions = function () {

		this.options.styles = this.options.styles || styleArray;
		this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;

	};

	Maps.prototype.initAPIScript = function() {

		if (!this.apiScript.src)
			this.apiScript.src = this.apiScriptURL;

		addListener(this.apiScript, 'load', 'onload', this.scriptLoadCtrl, false);

	};

	Maps.prototype.init = function() {

		this.initAPIScript();

	};

	return Maps;

})();

/*
*
* \/ OLD CODE HERE \/
*
* */

var localMap = document.getElementById('local-map');
var repsMap = document.getElementById('reps-map');

function initLocalMap(canvas) {

	var myLatLng = {lat: -22.7753073, lng: -50.2077834};

	var styleArray = [
		{
			featureType: "all",
			stylers: [
				{ saturation: -80 }
			]
		},{
			featureType: "road.arterial",
			elementType: "geometry",
			stylers: [
				{ hue: "#00ffee" },
				{ saturation: 50 }
			]
		},{
			featureType: "poi",
			stylers: [
				{ visibility: "on" }
			]
		}
	];

	var mapOptions = {
		scrollwheel: false,
		center: myLatLng,
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: styleArray
	};

	var map = new google.maps.Map(canvas, mapOptions);

	var marker = new google.maps.Marker({
		map: map,
		position: myLatLng,
		title: 'Hello World!'
	});


}

function initMaps() {
	setTimeout(function() {
		initLocalMap(localMap);
		setTimeout(function() {
			initLocalMap(repsMap);
		}, 800);
	}, 800);
}

//	setTimeout(initMaps, 1000);