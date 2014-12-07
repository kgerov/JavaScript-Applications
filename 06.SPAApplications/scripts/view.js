var application = application || {};

application.view = (function () {
	function View () {
		
	}

	View.prototype.insertBooks = function(selector, data) {
		var book;
		$(selector).html('');

		var theData = { books:[] };

		for (var a in data.results) {
			book = data.results[a];
			var currentBook = {
				title: book.title,
				author: book.author,
				isbn: book.isbn,
				id: book.objectId
			}
			
			theData.books.push(currentBook);
		}

		var theTemplateScript = $("#book-shelf").html();

		var theTemplate = Handlebars.compile(theTemplateScript);	
		$(selector).append(theTemplate(theData));
	};

	return {
		get: function () {
			return new View();
		}
	}
})();