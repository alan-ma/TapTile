var rows = 0;
var current_row = 0;
var score = 0;
var shown_score = 0;
var answers = [];
var date = new Date();
var interval = 8;
var start = date.getSeconds();
var stop = start + interval;
var new_game = true;
function randint(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function resetBar() {
	$('#time_remaining').css('transition', 'width 0s linear');
	$('#time_remaining').css('width', '100%');
}
function lowerBar() {
	$('#time_remaining').css('transition', 'width ' + (interval).toString() + 's linear');	
	$('#time_remaining').css('width', '0');
	resetTime();
}
function youLose() {
	if (confirm("You lose.\nFinal score: " + shown_score.toString() + ".\nGood job!")) {
		shown_score = 0;
		$('#score').html(shown_score);
	}
	resetBar();
	new_game = true;
}
function gameOver() {
	if (confirm("Game Over!\nFinal score: " + shown_score.toString() + ".\nGood job!")) {}
	shown_score = 0;
	$('#score').html(shown_score);
	resetBar();
	new_game = true;
}
function isCorrect() {
	if (new_game) {
		lowerBar();
		new_game = false;
	}
	$('#' + 'row' + (rows-3).toString() + ' .tile.correct').addClass('clicked');
	addRow(randint(0,4));
	current_row += 1;
	score += 1;
	shown_score += 1;
	$('#score').html(shown_score);
}
function isWrong(col_value) {
	var temp = $('#' + 'row' + (rows-3).toString() + ' .tile.' + col_value);
	temp.addClass('wrong');
	setTimeout(function() {
		youLose();
		temp.removeClass('wrong');
	}, 1);
}
function addRow(correct) {
	var new_id = 'row' + rows.toString();
	$('#game').prepend('<div id="' + new_id + '" class="row"></div>');
	for (i=0; i<4; i++) {
		if (i == correct) {
			$('#' + new_id).append('<div class="tile correct ' + i.toString() + '" data-col="' + i.toString() + '"></div>');
			answers.push(i);
		} else {
			$('#' + new_id).append('<div class="tile ' + i.toString() + '" data-col="' + i.toString() + '"></div>');
		}
	}
	$('#' + new_id + ' .tile').click(function() {
		if ($(this).attr('data-col') == answers[score]) {
			isCorrect();
		} else {
			isWrong($(this).attr('data-col'));
		}
	});
	rows += 1;
}
function resetTime() {
	date = new Date();
	start = date.getSeconds();
	stop = (start + interval) % 60;
}
$(document).ready(function() {
	(function doTimeout(i) {
		setTimeout(function () {
			if (i--) {
				addRow(randint(0,4));
				doTimeout(i);
			}
		}, 0);
	})(3);
	$(document).keypress(function(event) {
		var value = -1;
		if (event.which == 102) {
			value = 0;
		} else if (event.which == 103) {
			value = 1;
		} else if (event.which == 104) {
			value = 2;
		} else if (event.which == 106) {
			value = 3;
		}
		if (value.toString() == answers[score]) {
			isCorrect();
		} else if (value != -1) {
			isWrong(value.toString());
		}
	});
	setInterval(function() {
		date = new Date();
		current_time = date.getSeconds()
		if (current_time == stop) {
			gameOver();
		}
	}, 500);
});