var app = app || {};

(function () {
	var baseUrl = 'https://api.parse.com/1/';
	var ajaxRequester = app.ajaxRequester.get();
	var data = app.data.get(ajaxRequester, baseUrl);
	var controller = app.controller.get(data);

	controller.attachEventHandlers();
	controller.Greet();

	app.router = Sammy(function () {
		var selector = '#body';
		
		this.get('#/', function () {
			controller.loadHome(selector);
		});

		this.get('#/login', function () {
			controller.loadLogin(selector);
		});

		this.get('#/register', function () {
			controller.loadRegister(selector);
		});

		this.get('#/bookmarks', function () {
			controller.loadBookmarks(selector);
		});
	});

	app.router.run('#/');
})();