var ajaxRequester = (function () {
	var PARSE_ID = 'oRD79TXY7DqEAFUIoWHvmDLbWKvUwDHHgkSp5Mgh',
		PARSE_REST_API_KEY = 'fyDB21i4fOZycBOAzwpSkyv40E8WIkoGslejKOrX';

	var makeRequest = function (method, url, data, success, error) {
		$.ajax({
			url: url,
			headers: {
				"X-Parse-Application-Id": PARSE_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
			},
			type: method,
			contentType: 'application/json',
			data: JSON.stringify(data) || undefined,
			success: success,
			error: error
		});		
	}

	var makeGetRequest = function (url, success, error) {
		var result = makeRequest('GET', url, null, success, error);
		return result;
	}

	var makePutRequest = function (url, data, success, error) {
		return makeRequest('PUT', url, data, success, error);
	}

	var makePostRequest = function (url, data, success, error) {
		return makeRequest('POST', url, data, success, error);
	}

	var makeDeleteRequest = function (url, success, error) {
		return makeRequest('DELETE', url, null, success, error);
	}

	return {
		get: makeGetRequest,
		post: makePostRequest,
		put: makePutRequest,
		delete: makeDeleteRequest
	}
})();