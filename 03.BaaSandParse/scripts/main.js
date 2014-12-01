var PARSE_ID = 'HvtBhZuePYJtgCTLVCUBxCHioS70i4BFpJOcGOiu',
	PARSE_REST_API_KEY = '3A4v99qPLqg0FQjObRMbvQ7uwwAtLa8cI5Pi2HZ1';

(function () {
	function displayCountries () {
		$.ajax({
			method: 'GET',
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
			},
			url: 'https://api.parse.com/1/classes/Country',
			success: function(data) {
				if ($('#display-countries-box ul').children().length > 0) {
					$('#display-countries-box ul').empty();
				}

			    for (var a in data.results) { 
			      var object = data.results[a];

			      var $text = $('<input>').val(object.Name);
			      var $li = $('<li>').data('countryId', object.objectId);
			      $li.append($text);
			      var $editButton = $('<button>').text('Edit')
			      							.attr('id', 'editButton')
			      							.click(editCountry);
			      $li.append($editButton);
			      var $deleteCountry = $('<button>').text('Delete')
			      									.attr('id', 'deleteButton')
			      									.click(deleteCountry);
			      $li.append($deleteCountry);

			      var $listTowns = $('<button>').text('List Towns')
			      								.attr('id', 'listTownsButton')
			      								.click(listTowns);
			      $li.append($listTowns);

			      $('#display-countries-box ul').append($li);
			    }
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}

	function addCountry () {
		var countryName = $('#add-country-text').val();
		$('#add-country-text').val('');

		$.ajax({
			method: "POST",
			contentType: 'application/json',
			data: JSON.stringify({"Name": countryName}),
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
			},
			url: 'https://api.parse.com/1/classes/Country',
			success: addCountryToList,
			error:  function(error) {
		    	alert("Error: " + error.code + " " + error.message);
		   }
		});

		function addCountryToList () {
			$('#display-countries').trigger('click');
		}
	}

	function editCountry () {
		var $this = $(this),
			countryId = $this.parent().data('countryId')
			countryName = $this.parent().find('input').val();

		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({"Name": countryName}),
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
			},
			url: 'https://api.parse.com/1/classes/Country/' + countryId,
			success: function () {
				displayCountries();
			},
			error: function () {
				
			}
		});
	}

	function deleteCountry () {
		var $this = $(this);
		var countryId = $this.parent().data('countryId');

		$.ajax({
			method: 'DELETE',
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
			},
			url: 'https://api.parse.com/1/classes/Country/' + countryId,
			success: function () {
				displayCountries();
			},
			error: function () {
				
			}
		});
	}

	function listTowns () {
		var $this = $(this);
		var countryId = $this.parent().data('countryId');

		$.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
			},
			url: 'https://api.parse.com/1/classes/Town?where={"Country":{"__type":"Pointer","className":"Country","objectId":"' + countryId	 + '"}}',
			success: addListedTowns,
			error:  function(error) {
		    	alert("Error: " + error.code + " " + error.message);
		   }
		});

		function addListedTowns (data) {
			if ($this.parent().find('ul').children().length > 0) {
				$this.parent().find('ul').empty();
			}

			$buttonAdd = $('<button>').text('Add Town')
			      						.attr('id', 'addTown')
			      						.click(addTown);

			$inputAdd = $('<input>').attr('id', 'add-town-text');

			$ul = $('<ul>').append($buttonAdd).append($inputAdd);

			for (var a in data.results) {
				var town = data.results[a];
				
				$buttonEdit = $('<button>').text('Edit')
			      						.attr('id', 'editTown')
			      						.click(editTown);

			    $buttonDelete = $('<button>').text('Delete')
			      						.attr('id', 'deleteTown')
			      						.click(deleteTown);

			    $input = $('<input>').val(town.Name)

			    
				$li = $('<li>').data('townId', town.objectId)
								.append($input)
								.append($buttonEdit)
								.append($buttonDelete)
								.prependTo($ul);

				$this.parent().append($ul);
			}
		}
	}

	function addTown () {
		var townName = $('#add-town-text').val(),
			countryId = $(this).parent().parent().data('countryId')
			parentS = $(this).parent().parent();

		$('#add-town-text').val('');

		$.ajax({
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				"Name": townName, 
				"Country": {
					"__type": "Pointer",
                    "className": "Country",
                    "objectId": countryId
				}
			}),
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
			},
			url: 'https://api.parse.com/1/classes/Town',
			success: refreshList,
			error:  function (error) {
				alert("Error: " + error.code + " " + error.message);
			} 
		});

		function refreshList () {
			parentS.find('#listTownsButton').trigger('click');
		}
	}

	function editTown () {
		var $this = $(this),
			townName = $this.parent().find('input').val()
			townId = $this.parent().data('townId'),
			parentS = $(this).parent().parent().parent();

		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({
				"Name": townName
			}),
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
			},
			url: 'https://api.parse.com/1/classes/Town/' + townId,
			success: refreshList,
			error: function () {
				
			}
		});

		function refreshList () {
			parentS.find('#listTownsButton').trigger('click');
		}
	}

	function deleteTown () {
		var $this = $(this);
		var townId = $this.parent().data('townId')
			parentS = $(this).parent().parent().parent();

		$.ajax({
			method: 'DELETE',
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
			},
			url: 'https://api.parse.com/1/classes/Town/' + townId,
			success: refreshList,
			error: function (error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		function refreshList () {
			parentS.find('#listTownsButton').trigger('click');
		}
	}

	$(document).ready(function () {
		$('#display-countries').on('click', displayCountries);
		$('#add-country').on('click', addCountry);
	});
})();