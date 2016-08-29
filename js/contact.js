/*!
 * Mowe Contact v1.0.0 (http://letsmowe.com/)
 * Copyright 2013-2016 Kabana's Info Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var Contact = (function() {

	/**
	 * Constructor of Contact
	 * Needs of jQuery Ajax (>1.11.3)
	 * @param viewport
	 * @param options
	 * @constructor menu
	 */
	function Contact(viewport, options) {

		var self = this;

		this.viewport = viewport;

		this.url = !!options.url ? options.url : false;

		this.data = {};

		this.fields = {};

		this.clickCtrl = function() {

			self.initResponse(this);

		};

		this.asyncSuccessCtrl = function(data) {

			console.log(data);

			if (data.sent)
				self.showMessage();
			//else
			//	self.send();

		};

		this.asyncErrorCtrl = function(data) {

			console.log('erro');
			//self.send();

		};

	}

	Contact.prototype.showMessage = function() {

		console.log('hhee');

	};

	Contact.prototype.send = function() {

		// TODO - fallback to init send action
		console.log('enviando');

		$.ajax({
			url: this.url,
			type: 'jsonp',
			cache: false,
			data: this.data,
			method: 'get',
			timeout: 30000,
			success: this.asyncSuccessCtrl,
			error: this.asyncErrorCtrl
		});

	};

	Contact.prototype.initSend = function() {

		this.send();

	};

	Contact.prototype.loadTextFieldValue = function(element) {

		return element ? element.value : false;

	};

	Contact.prototype.loadFieldsData = function(initSend) {

		this.data.name = this.loadTextFieldValue(this.fields.name);
		this.data.mail = this.loadTextFieldValue(this.fields.mail);
		this.data.phone = this.loadTextFieldValue(this.fields.phone);
		this.data.message = this.loadTextFieldValue(this.fields.message);

		if (initSend) this.initSend();

	};

	Contact.prototype.validateTextField = function(element) {

		return element ? element.value != '' : false;

	};

	Contact.prototype.validateOptionalFields = function() {

		return (!!this.validateTextField(this.fields.phone) || !!this.validateTextField(this.fields.mail));

	};

	Contact.prototype.validateFields = function() {

		return !(!this.validateTextField(this.fields.name) || !this.validateTextField(this.fields.message) || !this.validateOptionalFields());

	};

	Contact.prototype.initResponse = function(event) {

		if (this.validateFields())
			this.loadFieldsData(true);
		else {
			// TODO - error function
		}

	};

	Contact.prototype.addListeners = function() {

		addListener(this.submit, 'click','onclick',this.clickCtrl, false);

	};

	Contact.prototype.getFields = function() {

		this.fields.name = document.getElementById('cNome');
		this.fields.mail = document.getElementById('cEmail');
		this.fields.phone = document.getElementById('cPhone');
		this.fields.message = document.getElementById('cMensagem');

		this.submit = document.getElementById('cSubmit');

		this.addListeners();

	};

	Contact.prototype.init = function() {

		this.getFields();

	};

	return Contact;

})();