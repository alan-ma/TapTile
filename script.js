var rows = 0;
var current_row = 0;
var score = 0;
function randint(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function youLose() {
	alert("You lose.\nFinal score: " + score.toString() + ".\nGood job!");
	score = 0;
	$('#score').html(score);
}
function addRow(correct) {
	var new_id = 'row' + rows.toString();
	$('#game').prepend('<div id="' + new_id + '" class="row"></div>');
	for (i=0; i<4; i++) {
		if (i == correct) {
			$('#' + new_id).append('<div class="tile correct" data-correct="1" data-row="' + rows.toString() + '"></div>');
		} else {
			$('#' + new_id).append('<div class="tile" data-correct="0"></div>');
		}
	}
	$('#' + new_id + ' .tile').click(function() {
		if ($(this).attr('data-correct') == '1' && $(this).attr('data-row') == current_row.toString()) {
			$(this).removeClass('correct');
			$(this).addClass('clicked');
			addRow(randint(0,4));
			current_row += 1;
			score += 1;
			$('#score').html(score);
		} else {
			youLose();
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
});