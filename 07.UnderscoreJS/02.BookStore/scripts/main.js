(function () {
	if (typeof require !== 'undefined') {
		_ = require('libs/underscore-min.js');
	}

	var books = [{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"34,24","language":"French"},
		{"book":"The Great Gatsby","author":"F. Scott Fitzgerald","price":"39,26","language":"English"},
		{"book":"Nineteen Eighty-Four","author":"George Orwell","price":"15,39","language":"English"},
		{"book":"Ulysses","author":"James Joyce","price":"23,26","language":"German"},
		{"book":"Lolita","author":"Vladimir Nabokov","price":"14,19","language":"German"},
		{"book":"Catch-22","author":"Joseph Heller","price":"47,89","language":"German"},
		{"book":"The Catcher in the Rye","author":"J. D. Salinger","price":"25,16","language":"English"},
		{"book":"Beloved","author":"Toni Morrison","price":"48,61","language":"French"},
		{"book":"Of Mice and Men","author":"John Steinbeck","price":"29,81","language":"Bulgarian"},
		{"book":"Animal Farm","author":"George Orwell","price":"38,42","language":"English"},
		{"book":"Finnegans Wake","author":"James Joyce","price":"29,59","language":"English"},
		{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"42,94","language":"English"}]

	console.log('Group all books by language and sort them by author (if two books have the same author, sort by price)');
	var grouped = _.groupBy(books, 'language');

	for(var i in grouped) {
		var currentBooks = grouped[i];
		var sortedByPrice = _.sortBy(currentBooks, 'price');
		var sortedByAuthor = _.sortBy(sortedByPrice, 'author');
		grouped[i] = sortedByAuthor;
	}
	
	for(var i in grouped) {
		console.log(i);
		printCollection(grouped[i]);
	}

	console.log('\n\nGet the average book price for each author');
	var groupedByAuthor = _.groupBy(books, 'author');
	var averagePrice = _.map(groupedByAuthor, function (currBooks, author) {
		var avPrice = 0;
		_.each(currBooks, function (b) {
			avPrice += Number((b.price).replace(',', '.'));
		});

		return {
			author: author,
			averagePrice: avPrice
		}
	});

	for(var i in averagePrice) {
		console.log('Author: ' + averagePrice[i].author + ', Average Price: ' + averagePrice[i].averagePrice);
	}

	console.log('\n\nGet all books in English or German, with price below 30.00, and group them by author');
	var germanEnglishCheap = _.filter(books, function (b) {
		return (b.language === 'English' || b.language === 'German') && Number((b.price).replace(',', '.')) < 30;
	});

	var groupedGergamEnglishCheap = _.groupBy(germanEnglishCheap, 'author');

	for(var i in groupedGergamEnglishCheap) {
		console.log(i);
		printCollection(groupedGergamEnglishCheap[i]);
	}

	function printCollection (collection) {
		console.log('');
		_.each(collection, function (c) {
			console.log(c.book + ', author: ' + c.author +
				', price: ' + c.price + ', language: ' + c.language);
		})

		console.log('-------------------------------------------------------------');
	}
}());