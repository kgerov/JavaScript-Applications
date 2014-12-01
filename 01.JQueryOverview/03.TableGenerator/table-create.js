$(document).ready(function () {
	var json = '[{"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"},' +
'{"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"}, ' +
'{"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}]',
	cars = JSON.parse(json),
	$table = $('<table>'),
	thTitles = ['Manufacturer', 'Model', 'Year', 'Price', 'Class'],
	$tr = $('<tr>');

	for (var i = 0; i < thTitles.length; i++) {
		$tr.append($('<th>').text(thTitles[i]));
	};

	$table.append($tr);

	for (var i = 0; i < cars.length; i++) {
		var $tr = $('<tr>');
		for(var key in cars[i]) {
			$tr.append($('<td>').text(cars[i][key]));
		}

		$table.append($tr);
	};

	$table.css('border', '1px solid black');
	$('#wrapper').append($table);
	$('#wrapper td, #wrapper th').css('border', '1px solid black');
	$('table').css('border-collapse', 'collapse');
	$('th, td').css('padding', '20px');
	$('th').css('background-color', '#fdff70');
});