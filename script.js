var rows = 0;
var current_row = 0;
var score = 0;
var shown_score = 0;
var answers = [];
var no_block = true;
function randint(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function youLose() {
	if (no_block) {
		alert("You lose.\nFinal score: " + shown_score.toString() + ".\nGood job!");
		no_block = false;
	}
	shown_score = 0;
	$('#score').html(shown_score);
}
function isCorrect() {
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
	no_block = true;
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
$(document).ready(function() {
	(function doTimeout (i) {
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
});