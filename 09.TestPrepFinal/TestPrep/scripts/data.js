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

		function getHeadersWithSessionToken () {
			var headers = {
				'X-Parse-Application-Id': 'A8OZBEZUtgwAvdWGU5o1ctm34Fan3a3v5p4FfhhN',
				'X-Parse-REST-API-Key': '6Mdw4SsTgaWiqTnhg706UUJlMe54xlgR0XXSgMdP',
				'X-Parse-Session-Token': getSessionToken()
			}

			return headers;
		}

		function getSessionToken () {
			return localStorage.getItem('sessionToken');
		}

		function setSessionToken (sessionToken) {
			localStorage.setItem('sessionToken', sessionToken);
		}

		function getUserId () {
			return localStorage.getItem('UserId');
		}

		function setUserId (objectId) {
			localStorage.setItem('UserId', objectId);
		}

		function getUserName () {
			return localStorage.getItem('Username');
		}

		function setUserName (username) {
			localStorage.setItem('Username', username);
		}

		return {
			getHeaders: function () {
				return headers;
			},
			getSessionToken: getSessionToken,
			setSessionToken: setSessionToken,
			setUserId: setUserId,
			getUserId: getUserId,
			setUserName: setUserName,
			getUserName: getUserName,
			getHeadersWithSessionToken: getHeadersWithSessionToken
		}
	})();

	var User = (function () {
		function User (ajaxRequester, baseUrl) {
			this._ajaxRequester = ajaxRequester;
			this._baseUrl = baseUrl;
		}

		User.prototype.login = function(username, password) {
			var url = this._baseUrl + 'login?username=' + username + '&password=' + password;

			return this._ajaxRequester.get(url, credentials.getHeaders())
				.then(function (data) {
					credentials.setSessionToken(data.sessionToken);
					credentials.setUserName(data.username);
					credentials.setUserId(data.objectId);
					return data;
				});
		};

		User.prototype.register = function(username, password) {
			var user = {
				username: username,
				password: password
			};

			return this._ajaxRequester.post(this._baseUrl + 'users', user, credentials.getHeaders())
				.then(function (data) {
					return user.username;
				}, function (error) {
					console.log(error);
				})
		}

		User.prototype.logout = function() {
			var deferred = Q.defer();

			localStorage.clear();
			q.resolve(true);

			return deferred.promise;
		};

		return User;
	})();

	var Bookmark = (function () {
		function Bookmark (ajaxRequester, baseUrl) {
			this._ajaxRequester = ajaxRequester;
			this._baseUrl = baseUrl + 'classes/Bookmark';
		}

		Bookmark.prototype.add = function(name, link) {
			 var bookmark = {
			 	name: name,
			 	link: link,
			 	ACL : {}
			 };
			
			if (localStorage.getSessionToken()) {
        		bookmark.ACL[credentials.getUserId()] = {"write": true, "read": true};
			}

			return this._ajaxRequester.post(this._baseUrl, bookmark, credentials.getHeadersWithSessionToken());
		};


		Bookmark.prototype.delete = function(id) {
			return this._ajaxRequester.delete(this._baseUrl + '/' + id, credentials.getHeaders());
		};

		Bookmark.prototype.getAll = function() {
			return this._ajaxRequester.get(this._baseUrl, credentials.getHeadersWithSessionToken());
		};

		Bookmark.prototype.getById = function(id) {
			return this._ajaxRequester.get(this._baseUrl + '/' + id, credentials.getHeaders());
		};

		return Bookmark;
	})();

	return {
		get: function (ajaxRequester, baseUrl) {
			return new Data(ajaxRequester, baseUrl);
		}
	}
})();