var canvas,
	context;

var x = 0,
	y = 0;

var dx = 0,
	dy = 0;

var timer;

window.onload = function () {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	drawMaze('maze.png', 147, 3);

	window.onkeydown = processKey;

};

function drawMaze(mazeFile, startX, startY) {
	clearTimeout(timer);

	dx = 0;
	dy = 0;

	var imgMaze = new Image();

	imgMaze.onload = function () {

		canvas.width = imgMaze.width;
		canvas.height = imgMaze.height;

		context.drawImage(imgMaze, 0, 0);

		x = startX;
		y = startY;

		var imgSmile = document.getElementById('smile');
		context.drawImage(imgSmile, x, y);
		context.stroke();

		timer = setTimeout(redraw, 10);
	};

	imgMaze.src = mazeFile;
}

function processKey(e) {
	dx = 0;
	dy = 0;

	context.beginPath();
	context.fillStyle = 'rgb(254,244,207)';
	context.rect(x,y, 12, 12);
	context.fill();

	//console.log(y + ' ' + canvas.height);
	//console.log(x + ' ' + canvas.width);

	if (e.keyCode == 38) {
		dy = -2;
	}
	if (e.keyCode == 40) {
		dy = 2;
	}
	if (e.keyCode == 37) {
		dx = -2;
	}
	if (e.keyCode == 39) {
		dx = 2;
	}
}

function redraw() {

	if (dx != 0 || dy != 0) {

		x += dx;
		y += dy;

		if (checkWall()) {
			x -= dx;
			y -= dy;
			dx = 0;
			dy = 0;
		}

		var imgSmile = document.getElementById('smile');
		context.drawImage(imgSmile, x, y);
	}

	if (y > 307 && x > 160 && x < 180) {
		alert('You Win!!!');
		y = 3;
		x = 147;
	}

	timer = setTimeout(redraw, 10);
}

function checkWall() {
	var imgData = context.getImageData(x-1,y-1,12+2,12+2);
	var pixels = imgData.data;

	for (var i = 0; n = pixels.length, i < n; i+=4) {
		var red = pixels[i];
		var green = pixels[i + 1];
		var blue = pixels[i + 2];

		if (red == 0 || green == 0 || blue == 0) {
			return true;
		}
		if (red == 169 || green == 169 || blue == 169) {
			return true;
		}
	}
	return false;
}