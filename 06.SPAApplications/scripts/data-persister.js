var application = application || {};

application.data = (function () {
	function Data (rootUrl) {
		this.rootUrl = rootUrl;
		this.books = new Base(rootUrl + 'Book/');
	}

	var Base = (function () {
		function Base (serviceUrl) {
			this.serviceUrl = serviceUrl;
		}

		Base.prototype.getAll = function(success, error) {
			var deferred = Q.defer();

			ajaxRequester.get(this.serviceUrl, function (data) {
				deferred.resolve(data);
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		Base.prototype.add = function(data, success, error) {
			return ajaxRequester.post(this.serviceUrl, data, success, error);
		};

		Base.prototype.edit = function(id, data, success, error) {
			return ajaxRequester.put(this.serviceUrl + id, data, success, error);
		};

		Base.prototype.remove = function(id, success, error) {
			return ajaxRequester.delete(this.serviceUrl + id, success, error);
		};

		return Base;
	})();

	return {
		get: function (rootUrl) {
			return new Data(rootUrl);
		}
	}
})();