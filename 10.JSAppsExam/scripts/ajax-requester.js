var app = app || {};

app.ajaxRequester = (function () {
	function ajaxRequester () {
		this.post = makePostRequest;
		this.get = makeGetRequest;
		this.put = makePutRequest;
		this.delete = makeDeleteRequest;
	}

	var makeRequest = function(url, method, data, headers) {
		var deferred = Q.defer();

		$.ajax({
			url: url,
			method: method,
			contentType: 'application/json',
			data: JSON.stringify(data) || undefined,
			headers: headers,
			success: function (data) {
				deferred.resolve(data);
			},
			error: function (error) {
				deferred.reject(error);
			}
		})

		return deferred.promise;
	};

	var makeGetRequest = function(url, headers) {
		return makeRequest(url, 'GET', null, headers);
	};

	var makePostRequest = function(url, data, headers) {
		return makeRequest(url, 'POST', data, headers);
	};

	var makePutRequest = function(url, data, headers) {
		return makeRequest(url, 'PUT', data, headers);
	};

	var makeDeleteRequest = function(url, headers) {
		return makeRequest(url, 'DELETE', null, headers);
	};

	return {
		get: function () {
			return new ajaxRequester();
		}
	}
})();