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
		this._data.bookmarks.getAll()
			.then(function (data) {
				$.get('templates/bookmarks.html', function (template) {
					var output = Mustache.render(template, data);
					$(selector).html(output);
				})
			}, function (error) {
				console.log("asdf");
				console.log(error);
			});
	};

	Controller.prototype.attachEventHandlers = function() {
		var selector = '#body';
		var header = 'header'

		attachRegisterHandlers.call(this, selector);
		attachLoginHandlers.call(this, selector);
		attachLogoutHandlers.call(this, header);
		attachAddHandlers.call(this, selector);
		attachDeleteHandlers.call(this, selector);
	};

	function attachRegisterHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#register-submit', function () {
			var username = $(this).parent().find('#user-name').val();
			var password = $(this).parent().find('#user-pass').val();

			$(this).parent().find('input').val('');
			_this._data.users.register(username, password)
				.then(function (username) {
					alert('User ' + username + ' is registered');
				});
		});
	}

	function attachLoginHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#login-submit', function () {
			var username = $(this).parent().find('#user-name').val();
			var password = $(this).parent().find('#user-pass').val();

			$(this).parent().find('input').val('');
			_this._data.users.login(username, password)
					.then(function (data) {
						$('header ul li:nth-child(2) a').click();
						_this.loadBookmarks('#body');
						_this.Greet();
					});
		});
	}

	function attachLogoutHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#logout', function () {
			_this._data.users.logout()
					.then(function (successLogout) {
						if (successLogout) {
							_this.loadBookmarks('#body');
							_this.Greet();
						}
					});
		});
	}

	function attachAddHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#add-bookmark', function () {
			var name = $(this).parent().find('#bookmark-name').val();
			var link = $(this).parent().find('#bookmark-link').val();

			$(this).parent().find('input').val('');
			_this._data.bookmarks.add(name, link)
				.then(function (data) {
					var bookmark = _this._data.bookmarks.getById(data.objectId);
					return bookmark;
				}, function (error) {
					console.log(error);
				})
				.then(function (data) {
					var $li = $('<li>').attr('data-id', data.objectId)
										.text(data.name + ' - ' + data.link);
					var $button = $('<button>').addClass('delete-bookmark')
												.text('X')
												.appendTo($li);

					$('#bookmark-box ul').append($li);
				}, function (error) {
					console.log(error);
				});
		})
	}

	function attachDeleteHandlers (selector) {
		var _this = this;

		$(selector).on('click', '.delete-bookmark', function () {
			var shouldDelete = confirm('Are you certain that you want to delete this bookmark?');

			if (shouldDelete) {
				var parent = $(this).parent();
				var id = parent.data('id');

				_this._data.bookmarks.delete(id)
					.then(function (data) {
						parent.remove();
					}, function (error) {
						console.log(error);
					})
			}
		});
	}

	Controller.prototype.Greet = function() {
		if (localStorage.getItem('Username')) {
			$('header #greeting a').text('Hello, ' + localStorage.getItem('Username'));
			$('header #greeting').css('visibility', 'visible');
			$('header #logout').css('visibility', 'visible');
			$('header #login').css('display', 'none');
		} else {
			$('header #greeting').css('visibility', 'hidden');
			$('header #logout').css('visibility', 'hidden');
			$('header #login').css('display', 'inline-block');
		}
	};

	return {
		get: function (data) {
			return new Controller(data);
		}
	}
})();