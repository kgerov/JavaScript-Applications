function moveRight () {
	var nextSlide = getNextSlide(true);
	moveSlide(nextSlide);
}

function moveLeft () {
	var nextSlide = getNextSlide(false);
	moveSlide(nextSlide);
}

function getNextSlide (isRight) {
	var currentId = String($('.page:not(:hidden)').attr('id')),
		current = currentId.charAt(currentId.length-1);
	if (isRight) {
		if (current == 3) {
			current = 1;
		} else {
			current++;
		}
	} else {
		if (current == 1) {
			current = 3;
		} else {
			current--;
		}
	}

	return current;
	
}

function moveSlide (nextSlideId) {
	$('.page').css('visibility', 'hidden');
	$('.page').css('display', 'none');

	$('#page-' + nextSlideId).css('visibility', 'visible');
	$('#page-' + nextSlideId).css('display', 'block');
}

$(document).ready(function () {
	$('#right-slide').on('click', moveRight);
	$('#left-slide').on('click', moveLeft);
});