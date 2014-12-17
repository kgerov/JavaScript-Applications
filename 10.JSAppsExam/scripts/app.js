var app = app || {};

(function () {
	var baseUrl = 'https://api.parse.com/1/';
	var ajaxRequester = app.ajaxRequester.get();
	var data = app.data.get(ajaxRequester, baseUrl);
	var controller = app.controller.get(data);

	controller.attachEventHandlers();
	controller.onPageLoad();

	app.router = Sammy(function () {
		var selector = '#main';
		
		this.get('#/', function () {
			controller.loadHome(selector);
		});

		this.get('#/login', function () {
			controller.loadLogin(selector);
		});

		this.get('#/register', function () {
			controller.loadRegister(selector);
		});

		this.get('#/welcome', function () {
			controller.loadWelcome(selector);
		});

		this.get('#/products', function () {
			controller.loadProducts(selector);
		});

		this.get('#/add-product', function () {
			controller.loadAddProducts(selector);
		});

		this.get('#/delete', function () {
			controller.loadDeleteProduct(selector);
		});

		this.get('#/edit', function () {
			controller.loadEditProduct(selector);
		});
	});

	if (localStorage.getItem('Username')) {
		app.router.run('#/welcome');
	} else {
		app.router.run('#/');
	}
})();