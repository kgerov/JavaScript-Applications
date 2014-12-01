(function($){
	$.fn.treeview = function() { 
		var $this = $(this),
		      $button = $('<button>').text('')
		      			.append('<img height="20" src="arrow.png" />')
		      			.click(function  () {
		      				var buttonParent = $(this).parent();
		      				if (buttonParent.find('> ul').css('visibility') == 'hidden') {
		      					buttonParent.find('> ul').css('visibility', 'visible');
		      					buttonParent.find('> ul').css('display', 'block');
		      				} else {
		      					buttonParent.find('> ul').css('visibility', 'hidden');
		      					buttonParent.find('> ul').css('display', 'none');
		      				}
		      			});

		$this.find('li').prepend("    ");
		var nestedLis = $this.find('li').has('ul');
		nestedLis.find('> ul').css('visibility', 'hidden');
		nestedLis.find('> ul').css('display', 'none');

		$this.find('li').prepend($button);

		$this.css('list-style-type', 'none');
		$this.find('li').css('list-style-type', 'none');

		return $this;
	}
}(jQuery));