var application = application || {};

application.controller = (function () {
	function Main (dataPersister) {
		this.persister = dataPersister;
	}

	Main.prototype.load = function(selector) {
		this.attachEventHandlers();
		this.loadBooks(selector);
	}

	Main.prototype.loadBooks = function(selector) {
		this.persister.books.getAll(
			function (data) {
				var book;
				$(selector).html('');

				for (var a in data.results) {
					book = data.results[a];
					var bookWrapper = $('<div>');
					var buttonDelete = $('<button>').addClass('remove-book').text('X');
					var buttonEdit = $('<button>').addClass('edit-book').text('Edit');
					bookWrapper.append($('<div>').text(book.title));
					bookWrapper.append($('<div>').text(book.author));
					bookWrapper.append($('<div>').text(book.isbn));
					bookWrapper.append(buttonDelete);
					bookWrapper.append(buttonEdit);
					bookWrapper.data('bookId', book.objectId);

					$(selector).append(bookWrapper);
				}
			},
			function (error) {
				console.log(error);
			});
	};

	Main.prototype.attachEventHandlers = function() {
		var _this = this;

		$('#create-book').on('click', function(ev) {
			var book = {
				'title': $('#name').val(),
				'author': $('#author').val(),
				'isbn': $('#isbn').val()
			}

			$('#name').val('');
			$('#author').val('');
			$('#isbn').val('');

			_this.persister.books.add(book, 
				function (data) {
					_this.loadBooks('#book-box');
				},
				function (error) {
					console.log(error);
				});
		});

		$('#book-box').on('click', '.remove-book', function(ev) {
			var id = $(this).parent().data('bookId');
			_this.persister.books.remove(id,
				function (data) {
					_this.loadBooks('#book-box');
				},
				function (error) {
					console.log(error);
				});
		});

		$('#book-box').on('click', '.edit-book', function(ev) {
			$('#edit').css('display', 'block');
			$('#edit').data('bookId', $(this).parent().data('bookId'));

			$('#edit-name').val($(this).parent().find('div:nth-child(1)').text());
			$('#edit-author').val($(this).parent().find('div:nth-child(2)').text());
			$('#edit-isbn').val($(this).parent().find('div:nth-child(3)').text());
		});

		$('#submit-edit-book').on('click', function(ev) {
			var id = $(this).parent().data('bookId');
			var book = {
				'title': $('#edit-name').val(),
				'author': $('#edit-author').val(),
				'isbn': $('#edit-isbn').val()
			}

			$('#edit-name').val('');
			$('#edit-author').val('');
			$('#edit-isbn').val('');
			$('#edit').css('display', 'none');

			_this.persister.books.edit(id, book, 
				function (data) {
					_this.loadBooks('#book-box');
				},
				function (error) {
					console.log(error);
				});
		});
	};

	return {
		get: function (dataPersister) {
			return new Main(dataPersister);
		}
	}
})();