(function () {
	var serviceRootUrl = 'https://api.parse.com/1/classes/';
	var persister = application.data.get(serviceRootUrl);
	var view = application.view.get();
	var controller = application.controller.get(persister, view);
	controller.load('#book-box');
})();