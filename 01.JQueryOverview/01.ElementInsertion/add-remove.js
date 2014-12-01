function onBeforeClick () {
 	var text = $('#element-input').val();
 	$('#element-input').val('');
 	var li = $('<li>').text(text);
 	$('#element-wrap').prepend(li);
 }

 function onAfterClick () {
 	var text = $('#element-input').val();
 	$('#element-input').val('');
 	var li = $('<li>').text(text);
 	$('#element-wrap').append(li);
 }


 $(document).ready(function () {
    $('#before-add').on('click', onBeforeClick);
 	$('#after-add').on('click', onAfterClick);
 });