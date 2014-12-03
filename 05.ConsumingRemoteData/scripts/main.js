(function () {
	var serviceRootUrl = 'https://api.parse.com/1/classes/';
	var persister = application.data.get(serviceRootUrl);
	var controller = application.controller.get(persister);
	controller.load('#book-box');
})();