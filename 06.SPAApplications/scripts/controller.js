var application = application || {};

application.controller = (function () {
	function Main (dataPersister, view) {
		this.persister = dataPersister;
		this.view = view;
	}

	Main.prototype.load = function(selector) {
		this.attachEventHandlers();
		this.loadBooks(selector);
	}

	Main.prototype.loadBooks = function(selector) {
		var _this = this;

		this.persister.books.getAll().then(
			function (data) {
				_this.view.insertBooks(selector, data);
			},
			function (error) {
				console.log(error);
			}).done();
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
			var id = $(this).parent().attr('data-bookId');
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
			$('#edit').data('bookId', $(this).parent().attr('data-bookId'));

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
		get: function (dataPersister, view) {
			return new Main(dataPersister, view);
		}
	}
})();