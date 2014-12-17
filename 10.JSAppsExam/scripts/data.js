var app = app || {};

app.data = (function () {
	function Data (ajaxRequester, baseUrl) {
		this.users = new User(ajaxRequester, baseUrl);
		this.products = new Product(ajaxRequester, baseUrl);
	}

	var credentials = (function () {
		var headers = {
			'X-Parse-Application-Id': 'FnbQCePss7gmMo4awk2GJehWh6BlJf7NyPZEdggv',
			'X-Parse-REST-API-Key': 'o8LHbTsgUklCu2HCrSp7jwriY2BAmJycljusQ1VP'
		}

		function getHeadersWithSessionToken () {
			var userHeaders = jQuery.extend({}, headers);
			userHeaders['X-Parse-Session-Token'] = getSessionToken();

			return userHeaders;
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
				})
		}

		User.prototype.logout = function() {
			var deferred = Q.defer();

			localStorage.clear();
			deferred.resolve(true);

			return deferred.promise;
		};

		return User;
	})();

	var Product = (function () {
		function Product (ajaxRequester, baseUrl) {
			this._ajaxRequester = ajaxRequester;
			this._baseUrl = baseUrl + 'classes/Product';
		}

		Product.prototype.add = function(name, category, price) {
			var userId = credentials.getUserId();
			var product = {
				name: name,
				category: category,
				price: price,
				ACL : {}
			};

			product.ACL[userId] = { "write" : true, "read" : true };
			product.ACL["*"] = { "read" : true };
			
			return this._ajaxRequester.post(this._baseUrl, product, credentials.getHeadersWithSessionToken());
		};


		Product.prototype.delete = function(id) {
			return this._ajaxRequester.delete(this._baseUrl + '/' + id, credentials.getHeadersWithSessionToken());
		};

		Product.prototype.getAll = function() {
			return this._ajaxRequester.get(this._baseUrl, credentials.getHeadersWithSessionToken());
		};

		Product.prototype.getById = function(id) {
			return this._ajaxRequester.get(this._baseUrl + '/' + id, credentials.getHeadersWithSessionToken());
		};

		Product.prototype.edit = function(id, newProduct) {
			return this._ajaxRequester.put(this._baseUrl + '/' + id, newProduct, credentials.getHeadersWithSessionToken());
		};

		return Product;
	})();

	return {
		get: function (ajaxRequester, baseUrl) {
			return new Data(ajaxRequester, baseUrl);
		}
	}
})();