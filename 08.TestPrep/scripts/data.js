var app = app || {};

app.data = (function () {
	function Data (ajaxRequester, baseUrl) {
		this.users = new User(ajaxRequester, baseUrl);
		this.bookmarks = new Bookmark(ajaxRequester, baseUrl);
	}

	var credentials = (function () {
		var headers = {
			'X-Parse-Application-Id': 'A8OZBEZUtgwAvdWGU5o1ctm34Fan3a3v5p4FfhhN',
			'X-Parse-REST-API-Key': '6Mdw4SsTgaWiqTnhg706UUJlMe54xlgR0XXSgMdP',
			'X-Parse-Session-Token': getSessionToken()
		}

		function getSessionToken () {
			return localStorage.getItem('sessionToken');
		}

		function setSessionToken (sessionToken) {
			localStorage.setItem('sessionToken', sessionToken);
		}

		return {
			getHeaders: function () {
				return headers;
			},
			getSessionToken: getSessionToken,
			setSessionToken: setSessionToken
		}
	})();

	var User = (function () {
		function User (ajaxRequester, baseUrl) {
			this._ajaxRequester = ajaxRequester;
			this._baseUrl = baseUrl;
		}

		return User;
	})();

	var Bookmark = (function () {
		function Bookmark (ajaxRequester, baseUrl) {
			var _ajaxRequester = ajaxRequester;
			var _baseUrl = baseUrl;
		}

		return Bookmark;
	})();

	return {
		get: function (ajaxRequester, baseUrl) {
			return new Data(ajaxRequester, baseUrl);
		}
	}
})();