(function () {
	function hideInputUser () {
		$('#wrapper label').hide();
		$('#wrapper #submit-user').hide();
		$('#wrapper #username').hide();
		$('#greetings-box').text('Hello, ' + localStorage.getItem('username'));
		$('#greetings-box').css('display', 'inline-block');
	}

	function showInputUser () {
		$('#wrapper label').show();
		$('#wrapper #submit-user').show();
		$('#wrapper #username').show();
		$('#greetings-box').text('');
		$('#greetings-box').css('display', 'none');
	}

	function clearStorage () {
		localStorage.clear();
		sessionStorage.clear();
		showInputUser();
		location.reload();
	}

	function logUser () {
		var $this = $(this),
			username = $this.parent().find('input').val();

		$this.parent().find('input').val('');

		localStorage.setItem('username', username);
		hideInputUser();

		
		loadSession();
	}

	function loadSession () {
		if (!sessionStorage.counter) {
			sessionStorage.setItem('counter', 0);
		}

		if (!localStorage.counter) {
			localStorage.setItem('counter', 0);
		}

		var sessCounter = parseInt(sessionStorage.getItem('counter'));
		var totalCounter = parseInt(localStorage.getItem('counter'));

		sessCounter++;
		totalCounter++;

		sessionStorage.setItem('counter', sessCounter);
		localStorage.setItem('counter', totalCounter);

		$('#sess-counter').text(sessCounter);
		$('#total-counter').text(totalCounter);

		$('#sess-counter-box').css('display', 'block');
		$('#total-counter-box').css('display', 'block');
		$('#sess-counter-box label').css('display', 'inline');
		$('#total-counter-box label').css('display', 'inline');
	}

	$(document).ready(function () {
		$('#submit-user').on('click', logUser);
		$('#clear-button').on('click', clearStorage);
		if (localStorage.getItem('username')) {
			hideInputUser();
			loadSession();
		}
	});
})();