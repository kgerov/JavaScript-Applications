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

	Controller.prototype.loadProducts = function(selector) {
		if (isLogedIn()) {
			this._data.products.getAll()
			.then(function (data) {
				var categories = getCategoriesFromProducts(data);

				for (var i = 0; i < data.results.length; i++) {
					var canWrite = false;

					if (data.results[i].ACL.hasOwnProperty(localStorage.getItem('UserId'))) {
						canWrite = true;
					}

					if (canWrite) {
						data.results[i].edit = true;
					}
				};
				$.get('templates/products.html', function (template) {
					var output = Mustache.render(template, data);
					$(selector).html(output);
				})

				changeCategories(categories);
			}, function (error) {
				showErrorMessage('A problem occured...');
			});
		} else {
			$(selector).load('templates/home.html');
		}		
	};

	Controller.prototype.loadWelcome = function(selector) {
		if (isLogedIn()) {
			$.get('templates/welcome.html', function (template) {
					var username = { username: localStorage.getItem('Username') };
					var output = Mustache.render(template, username);
					$(selector).html(output);
			});
		} else {
			$(selector).load('templates/home.html');
		}
	};

	Controller.prototype.loadAddProducts = function(selector) {
		if (isLogedIn()) {
			$(selector).load('templates/addproducts.html');
		} else {
			$(selector).load('templates/home.html');
		}
	};

	Controller.prototype.loadDeleteProduct = function(selector, id) {
		var _this = this;

		if (isLogedIn()) {
			if (id === undefined) {
				return;
			}
			$.get('templates/delete.html', function (template) {
					_this._data.products.getById(id)
						.then(function (data) {
							var product = data;
							var output = Mustache.render(template, product);
							$(selector).html(output);
						}, function (error) {
							showErrorMessage('Unable to retrieve product');
						});
					
			});
		}
	};

	Controller.prototype.loadEditProduct = function(selector, id) {
		var _this = this;

		if (isLogedIn()) {
			if (id === undefined) {
				return;
			}
			$.get('templates/edit.html', function (template) {
					_this._data.products.getById(id)
						.then(function (data) {
							var product = data;
							var output = Mustache.render(template, product);
							$(selector).html(output);
						}, function (error) {
							showErrorMessage('Unable to retrieve product');
						});
					
			});
		} else {
			$(selector).load('templates/home.html');
		}
	};

	Controller.prototype.attachEventHandlers = function() {
		var selector = '#main';
		var header = 'header'

		attachRegisterHandlers.call(this, selector);
		attachLoginHandlers.call(this, selector);
		attachLogoutHandlers.call(this, header);
		attachAddHandlers.call(this, selector);
		attachDeleteHandlers.call(this, selector);
		attachDeleteProductHandlers.call(this, selector);
		attachEditHandlers.call(this, selector);
		attachEditProductHandlers.call(this, selector);
		attachFilterHandlers.call(this, selector);
		attachClearFilterHandlers.call(this, selector);
	};

	function attachRegisterHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#register-button', function () {
			var username = $('#username').val();
			var password = $('#password').val();
			var confirmpass = $('#confirm-password').val();

			if (password === confirmpass) {
					_this._data.users.register(username, password)
						.then(function (username) {
							var msg = 'User ' + username + ' successfuly registered!';
							showSuccessMessage(msg);
						}, function (error) {
							showErrorMessage('Invalid registration');
						});
			} else {
				showErrorMessage('Password doesn\' match');
			}

			$('.register-form div input').val('');
		});
	}

	function attachLoginHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#login-button', function () {
			var username = $('#username').val();
			var password = $('#password').val();

			$('.register-form div input').val('');

			_this._data.users.login(username, password)
					.then(function (data) {
						_this.onPageLoad();
						$('header #registered-user li:nth-child(1) a').click();
						showSuccessMessage('Logged in!');
					}, function (error) {
						showErrorMessage('Incorrect username/password.');
					});
		});
	}

	function attachLogoutHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#logout-button', function () {
			_this._data.users.logout()
					.then(function (successLogout) {
						if (successLogout) {
							_this.onPageLoad();
							$('header #unregistered-user li:nth-child(1) a').click();
							showSuccessMessage('Loggd out!')
						}
					}, function (erro) {
						showErrorMessage('Something happened ... Try again');
					});
		});
	}

	function attachAddHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#add-product-button', function () {
			var name = $('#name').val();
			var category = $('#category').val();
			var price = $('#price').val();

			$('.add-product-form input').val('');

			_this._data.products.add(name, category, price)
				.then(function (data) {
					$('header #registered-user li:nth-child(2) a').click();
					showSuccessMessage('Product added successfully');
				}, function (error) {
					showErrorMessage('Invalid product');
				});
		})
	}

	function attachDeleteHandlers (selector) {
		var _this = this;

		$(selector).on('click', '.delete-button', function () {
			var parent = $(this).closest('li');
			var id = parent.data('id');
			window.location.href = '#/delete';
			_this.loadDeleteProduct(selector, id);
		})
	}

	function attachDeleteProductHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#delete-product-button', function () {
			var eventThis = this;
			noty(
			{
			    text: "Delete this product?",
			    type: 'confirm',
			    layout: 'topCenter',
			    buttons: [
			        {
			            text : "Yes",
			            onClick : function($noty) {
			                deleteProduct();
			                $noty.close();
			            }
			        },
			        {
			            text : "Cancel",
			            onClick : function($noty) {
			                $noty.close();
			            }
			        }
			    ]}
			);

			function deleteProduct () {
				var id = $(eventThis).parent().data('id');

				_this._data.products.delete(id)
					.then(function (data) {
						$('header #registered-user li:nth-child(2) a').click();
						showSuccessMessage('Item successfully removed.')

					}, function (error) {
						showErrorMessage('Couldn\' delete item');
					})
			}
		});
	}

	function attachEditHandlers (selector) {
		var _this = this;

		$(selector).on('click', '.edit-button', function () {
			var parent = $(this).closest('li');
			var id = parent.data('id');
			window.location.href = '#/edit';
			_this.loadEditProduct(selector, id);
		})
	}

	function attachEditProductHandlers (selector) {
		var _this = this;

		$(selector).on('click', '#edit-product-button', function () {
			var id = $(this).parent().data('id');
			var productUpdated = {
				name : $('#item-name').val(),
				category : $('#category').val(),
				price : $('#price').val()
			}

			_this._data.products.edit(id, productUpdated)
				.then(function (data) {
					$('header #registered-user li:nth-child(2) a').click();
					showSuccessMessage('Update successful');
				}, function () {
					showErrorMessage('Update failed');
				})
		});
	}

	function attachFilterHandlers (selector) {
		var _this = this;
		

		$(selector).on('click', '#filter', function () {
			var	keyword = $('#search-bar').val(),
				minPrice = $('#min-price').val(),
				maxPrice = $('#max-price').val(),
				category = $('#category').find(':selected').text()
				productsList = []
				items = $('.products ul li');

			for (var i = 0; i < items.length; i++) {
				var currentProduct = {
					name: "",
					category: "",
					price: "",
					id : ""
				};

				currentProduct.name = $(items[i]).find('.item-name').text();
				currentProduct.category = ($(items[i]).find('.category').text()).replace('Category:', '');
				currentProduct.price = Number($(items[i]).find('.price').text().replace('Price: $ ', ''));
				currentProduct.id = $(items[i]).data('id');
				productsList.push(currentProduct);
			}

			var filteredProducts = _.filter(productsList, function (p) {
				return (keyword ? p.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 : true) &&
					(p.price >= minPrice && p.price <= maxPrice) &&
					(category != 'All' ? (p.category == category) : true);
			});

			$('.products ul li').css('display', 'none');

			for (var i = 0; i < filteredProducts.length; i++) {
				$('.products ul li[data-id=' + filteredProducts[i].id + ']').css('display', 'block');
			}
		});
	}

	function attachClearFilterHandlers (selector) {
		$(selector).on('click', '#clear-filters', function () {
			$('.products ul li').css('display', 'block');
			$('.filters input').val('');
			$('.filters #min-price').val(0);
			$('.filters #max-price').val(10000);
			$('.filters #category').val('All');
		});
	}

	function getCategoriesFromProducts (data) {
		var categories = [];

		for (var i = 0; i < data.results.length; i++) {
			var currentCategory = data.results[i].category;
			if (categories.indexOf(currentCategory) == -1) {
				categories.push(currentCategory);
			}
		}

		return categories;
	}

	function changeCategories (categories) {
		for (var i = 0; i < categories.length; i++) {
			var option = $('<option>').text(categories[i]).attr('value', categories[i]);
			$('aside select').append($('<option>').text(categories[i]).attr('value', categories[i]));
		};
	}

	Controller.prototype.onPageLoad = function() {
		if (isLogedIn()) {
			$('header #registered-user').css('display', 'block');
			$('header #unregistered-user').css('display', 'none');
		} else {
			$('header #registered-user').css('display', 'none');
			$('header #unregistered-user').css('display', 'block');
		}
	};

	function isLogedIn () {
		if (localStorage.getItem('Username')) {
			return true;
		}

		return false;
	}

	function showErrorMessage(message) {
        noty({
                text: message,
                type: 'error',
                layout: 'bottomCenter',
                timeout: 5000}
        );
    }

    function showSuccessMessage (message) {
    	noty({
                text: message,
                type: 'success',
                layout: 'bottomCenter',
                timeout: 2000}
        );
    }

	return {
		get: function (data) {
			return new Controller(data);
		}
	}
})();