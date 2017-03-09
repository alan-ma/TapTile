var rows = 0;
function randint(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function addRow(correct) {
	var new_id = 'row' + rows.toString();
	$('#game').prepend('<div id="' + new_id + '" class="row"></div>');
	for (i=0; i<4; i++) {
		if (i == correct) {
			$('#' + new_id).append('<div class="tile correct" data-correct="1"></div>');
		} else {
			$('#' + new_id).append('<div class="tile" data-correct="0"></div>');
		}
	}
	$('#' + new_id + ' .tile').click(function() {
		addRow(randint(0,4));
	});
	rows += 1;
}
$(document).ready(function() {
	var score = 0;
	(function doTimeout (i) {
		setTimeout(function () {
			if (i--) {
				addRow(randint(0,4));
				doTimeout(i);
			}
		}, 0);
	})(4);
});