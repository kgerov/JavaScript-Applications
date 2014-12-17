var app = app || {};

app.controller = (function () {
	function Controller (data) {
		this._data = data;
	}

	Controller.prototype.loadHome = function(selector) {
		$(selector).load('templates/home.html');
	};

	Controller.prototype.loadRegister = function(selector) {
		$(selector).load('templates/register.html');
	};

	Controller.prototype.loadLogin = function(selector) {
		$(selector).load('templates/login.html');
	};

	Controller.prototype.loadBookmarks = function(selector) {
		$(selector).load('templates/bookmarks.html');
	};

	Controller.prototype.attachEventHandlers = function() {
		
	};


	return {
		get: function (data) {
			return new Controller(data);
		}
	}
})();