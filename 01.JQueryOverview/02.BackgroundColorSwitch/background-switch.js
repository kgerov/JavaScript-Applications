function colorBackground () {
	$('li').css('background-color', 'none');
	var color = $('#color').val();
	var targetId = $('#class').val();
	$('.' + targetId).css('background-color', color);

	$('input').val('');
}

$(document).ready(function () {
	$('#paint').on('click', colorBackground);
});