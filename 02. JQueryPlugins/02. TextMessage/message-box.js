(function($) {
	$.fn.messageBox = function() { 
		var $this = $(this),
			SUCCESSMESSAGECLASS = 'message-box-success',
			ERRORMESSAGECLASS = 'message-box-error';

		function success (message) {
			var div = createMessage(message, SUCCESSMESSAGECLASS);
			$this.append(div);
		}

		function error (message) {
			var div = createMessage(message, ERRORMESSAGECLASS);
			$this.append(div);
		}

		function createMessage (message, classId) {
			var div = $('<div>').text(message)
								.addClass(classId)
								.delay(3000)
								.animate({
									opacity: 0
								}, 1000, function () {
									div.remove();
								});
			return div;
		}

		return {
			success : success,
			error: error
		};
	}
}(jQuery));