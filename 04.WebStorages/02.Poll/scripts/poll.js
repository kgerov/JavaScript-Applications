var QUESTION_COUNT = 3
	CORRECT_ANSWER = "Your answer is correct!",
	INCORRECT_ANSWER = "Your answer is incorrect ): Correct answer is: ";

function processPoll () {
	$('input[type="radio"]').attr('disabled', 'true');
	$('#submit-poll').attr('disabled', 'true');

	var question1 = $('<p>'),
		question2 = $('<p>'),
		question3 = $('<p>');

	if (localStorage.getItem('best-city') == 'pernik') {
		question1.text(CORRECT_ANSWER);
	} else {
		question1.text(INCORRECT_ANSWER + 'Pernik');
	}

	if (localStorage.getItem('best-dish') == 'banica') {
		question2.text(CORRECT_ANSWER);
	} else {
		question2.text(INCORRECT_ANSWER + 'Banica');
	}

	if (localStorage.getItem('best-dress') == 'adidas') {
		question3.text(CORRECT_ANSWER);
	} else {
		question3.text(INCORRECT_ANSWER + 'ancung Adidas');
	}

	$('#answer-box').append(question1)
			.append(question2)
			.append(question3);

	localStorage.setItem('formCompleted', 'true');
}

function resetPoll () {
	localStorage.clear();
	location.reload();
}

function saveAnswer () {
	var questionIndex = $(this).attr('name')
		questionAnswer = $(this).attr('value');

	switch(questionIndex) {
		case 'best-city' : updateAnswer('best-city');
			break;
		case 'best-dish' : updateAnswer('best-dish');
			break;
		case 'best-dress' : updateAnswer('best-dress');
			break;
		default: throw {message: "Invalid question" };
	}

	function updateAnswer (question) {
		localStorage.setItem(question, questionAnswer);
		localStorage.setItem('formStarted', 'true');
	}
}

function restoreAnswers () {
	var answer1 = localStorage.getItem('best-city')
		answer2 = localStorage.getItem('best-dish'),
		answer3 = localStorage.getItem('best-dress');

	if (answer1) {
		$('#questions-box div:nth-child(1) input[value="' + answer1 + '"]').attr('checked', 'true');
	}

	if (answer2) {
		$('#questions-box div:nth-child(2) input[value="' + answer2 + '"]').attr('checked', 'true');
	}

	if (answer3) {
		$('#questions-box div:nth-child(3) input[value="' + answer3 + '"]').attr('checked', 'true');
	}	
}

function startTime (startCount) {
	var count = startCount || 60, 
		timeElapsedMessage = 'Your time has elapseed... The current asnwers have been sumbitted';

	var counter = setInterval(timer, 1000);

	function timer()
	{
		if (localStorage.getItem('formCompleted') == 'true') {
			$('#counter').text("Seconds left: " + localStorage.getItem('time-left'));
			clearInterval(counter);
			return;
		}

		count=count-1;
		
		if (count <= 0)
		{
			 clearInterval(counter);

			 var $p = $('<p>').text(timeElapsedMessage)
			 		.attr('id', 'redMessage');

			 $('#answer-box').append($p); //Error message
			 $('#submit-poll').trigger('click'); //Submit form
			 return;
		}

	 	$('#counter').text("Seconds left: " + count);
	 	localStorage.setItem('time-left', count);
	}
}

$(document).ready(function  () {
	if (localStorage.getItem('formCompleted') == 'true') {
		processPoll();
	}

	$('#submit-poll').on('click', processPoll);
	$('#reset-poll').on('click', resetPoll);

	for (var i = 0; i < QUESTION_COUNT; i++) {
		var currentQuestion = $('#wrapper #questions-box div:nth-child(' +(i+1) + ')' );
		currentQuestion.find('input[type="radio"]').on('change', saveAnswer);
	}

	if (localStorage.getItem('formStarted') == 'true') {
		startTime(Number(localStorage.getItem('time-left')));
		restoreAnswers();
	} else {
		startTime();
	}
});