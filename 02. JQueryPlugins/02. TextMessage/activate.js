(function () {
	var messageBox = $('#message-box').messageBox();

	$(document).ready(function () {
		$('#error').on('click', function () {
			messageBox.error('Error message.');
		});

		$('#success').on('click', function () {
			messageBox.success('Success message.');
		});
	});
})();