/* Reps */

var reps = {};

reps.viewport = document.getElementById('reps');

reps.wrapper = document.getElementById('reps-wrapper');

/* Reps Frames Structure */

reps.frames = {};

reps.frames.viewport = document.getElementById('reps-frames');

reps.frames.intro = document.getElementById('reps-intro');

reps.frames.content = document.getElementById('reps-content');

reps.frames.btn = {};

reps.frames.btn.toggle = [];

reps.frames.current = false;

reps.frames.list = [];

reps.frames.resizeViewport = function(size) {

	reps.frames.viewport.style.width = size + 'px';

};

reps.frames.resizeFrames = function(size) {

	reps.frames.intro.style.width = size + 'px';
	reps.frames.content.style.width = size + 'px';

};

reps.frames.resize = function(size, n) {

	reps.frames.resizeViewport(size * n);
	reps.frames.resizeFrames(size);

};

reps.frames.enableAnimation = function() {

	reps.frames.viewport.classList.add('animate');

};

reps.frames.disableAnimation = function() {

	reps.frames.viewport.classList.remove('animate');

};

reps.frames.translate = function(animate) {

	var n, size;

	size = reps.viewport.offsetWidth;

	if (animate) reps.frames.enableAnimation();

	reps.frames.resize(size, 2);

	n = (reps.frames.intro.classList.contains('active')) ? 0 : -1;

	reps.frames.intro.style.transform = 'translateX(' + size * n + 'px)';
	reps.frames.content.style.transform = 'translateX(' + size * ( n + 1 ) + 'px)';

	if (animate) setTimeout(reps.frames.disableAnimation, 500);

};

reps.frames.updateCurrent = function() {

	// solução temporaria
	// alterna entre reps-intro e reps-content

	if (reps.frames.current) {

		if (reps.frames.intro.classList.contains('active')) {

			reps.frames.intro.classList.remove('active');
			reps.frames.content.classList.add('active');
			reps.frames.current = reps.frames.content;

		} else {

			reps.frames.intro.classList.add('active');
			reps.frames.content.classList.remove('active');
			reps.frames.current = reps.frames.intro;

		}

		reps.frames.translate(true);

	} else {

		reps.frames.current = reps.frames.intro;

		reps.frames.translate(false);

	}

	//reps.frames.resize(reps.viewport.offsetWidth, 2);

};

reps.frames.btn.toggleCtrl = function() {

	reps.frames.updateCurrent();

};

reps.frames.btn.addListeners = function() {

	for (var i = reps.frames.btn.toggle.length; i--; )
		reps.frames.btn.toggle[i].addEventListener('click', reps.frames.btn.toggleCtrl);

	window.addEventListener('resize', function() {
		reps.frames.translate(false);
	});

};

reps.frames.btn.getButtons = function () {

	var i, e;

	e = reps.frames.viewport.querySelectorAll('.toggle');

	for (i = e.length; i--; )
		reps.frames.btn.toggle.push(e[i]);

};

reps.frames.btn.init = function() {

	reps.frames.btn.getButtons();
	reps.frames.btn.addListeners();

};

reps.frames.init = function() {

	reps.frames.updateCurrent();
	reps.frames.btn.init();

};

/* Reps List */

reps.list = {};

reps.list.viewport = document.getElementById('reps-list');

reps.list.buildRepWebSite = function(link) {

	var website = document.createElement('div');
	website.classList.add('rep-website');
	website.classList.add('link');

	var a = document.createElement('a');
	a.href = link.url;

	var icon = document.createElement('span');
	icon.classList.add('icon');
	icon.classList.add('icon-globe');

	var span = document.createElement('span');
	span.innerHTML = 'Site';

	a.appendChild(icon);
	a.appendChild(span);

	website.appendChild(a);

	return website;

};

reps.list.buildRepEmail = function(link) {

	var email = document.createElement('div');
	email.classList.add('rep-email');
	email.classList.add('link');

	var a = document.createElement('a');
	a.href = link.url;

	var icon = document.createElement('span');
	icon.classList.add('icon');
	icon.classList.add('icon-mail');

	var span = document.createElement('span');
	span.innerHTML = 'E-mail';

	a.appendChild(icon);
	a.appendChild(span);

	email.appendChild(a);

	return email;

};

reps.list.buildRepPhone = function(text) {

	var phone = document.createElement('div');
	phone.classList.add('rep-phone');

	var a = document.createElement('a');

	var span = document.createElement('span');
	span.innerHTML = text;

	phone.appendChild(span);

	return phone;

};

reps.list.buildRepAddress = function(text) {

	var address = document.createElement('div');
	address.classList.add('rep-address');

	var span = document.createElement('span');
	span.innerHTML = text;

	address.appendChild(span);

	return address;

};

reps.list.buildRepTitle = function(text) {

	var title = document.createElement('div');
	title.classList.add('rep-title');

	var span = document.createElement('span');
	span.innerHTML = text;

	title.appendChild(span);

	return title;

};

reps.list.repCtrlClick = function(r) {

	reps.map.map.setCenter(r.marker.getPosition());
	reps.map.map.setZoom(17);

};

reps.list.buildRep = function(r) {

	var rep = document.createElement('li');
	rep.classList.add('rep');

	var repInner = document.createElement('div');
	repInner.classList.add('rep-inner');

	var repHeader = document.createElement('header');
	repHeader.classList.add('rep-header');

	if (r.title) repHeader.appendChild(reps.list.buildRepTitle(r.title));
	if (r.address) repHeader.appendChild(reps.list.buildRepAddress(r.address));
	if (r.phone) repHeader.appendChild(reps.list.buildRepPhone(r.phone));

	var repFooter = document.createElement('footer');
	repFooter.classList.add('rep-footer');

	if (r.email) repFooter.appendChild(reps.list.buildRepEmail(r.email));
	if (r.website) repFooter.appendChild(reps.list.buildRepWebSite(r.website));

	repInner.appendChild(repHeader);
	repInner.appendChild(repFooter);

	rep.appendChild(repInner);

	rep.addEventListener('click', function() {
		reps.list.repCtrlClick(r);
	});

	return rep;

};

reps.list.build = function(r) {

	r.element = reps.list.buildRep(r);
	reps.list.viewport.appendChild(r.element);

	setTimeout(function() {

		r.element.classList.add('build');

	}, 200);

};

reps.list.destroy = function(r) {

	r.element.classList.remove('build');

	setTimeout(function() {

		if (r.element) {

			reps.list.viewport.removeChild(r.element);
			r.element = false;

		}

	}, 400);

};

reps.list.update = function(bounds) {

	var i;

	if (!bounds) {

		for (i = reps.list.data.length; i--; )
			reps.list.build(reps.list.data[i]);

	} else {

		for (i = reps.list.data.length; i--; ) {

			if (bounds.contains(reps.list.data[i].marker.getPosition())) {

				if (!reps.list.data[i].element) reps.list.build(reps.list.data[i]);

			} else if (reps.list.data[i].element) reps.list.destroy(reps.list.data[i]);

		}

	}

};

reps.list.init = function() {

	reps.list.update(false);

};

/* Reps Map */

reps.map = {};

reps.map.viewport = document.getElementById('reps-map');

reps.map.canvas = reps.map.viewport;

reps.map.center = {
	lat: -22.7753073,
	lng: -50.2077834
};

reps.map.zoom = 11;

reps.map.styles = [
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

reps.map.options = {};

reps.map.markers = {};

reps.map.markers.add = function(marker, map) {

	return new google.maps.Marker({
		map: map,
		position: marker.position,
		title: marker.title
	});

};

reps.map.markers.addAll = function(map) {

	for (var i = reps.list.data.length; i--; )
		reps.list.data[i].marker = (reps.map.markers.add(reps.list.data[i], map));

};

reps.map.markers.recalculating = false;

reps.map.markers.startCalculation = function() {

	reps.map.markers.recalculating = true;

};

reps.map.markers.finishRecalculation = function() {

	reps.map.markers.recalculating = false;

	reps.list.update(reps.map.map.getBounds());

};

reps.map.markers.boundsChangeCtrl = function() {

	if (!reps.map.markers.recalculating) {

		reps.map.markers.startCalculation();

		reps.list.update(reps.map.map.getBounds());

		setTimeout(reps.map.markers.finishRecalculation, 1000);

	}

};

reps.map.init = function() {

	reps.map.options = {
		scrollwheel: false,
		center: reps.map.center,
		zoom: reps.map.zoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: reps.map.styles
	};

	reps.map.map = new google.maps.Map(reps.map.canvas, reps.map.options);
	reps.map.markers.addAll(reps.map.map);

	google.maps.event.addListener(reps.map.map, 'bounds_changed', reps.map.markers.boundsChangeCtrl);

};

reps.init = function() {

	reps.frames.init();

	//reps.map.init();
	//reps.list.init();

};