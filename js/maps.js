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