var cols, rows;
var w = 20;
var grid = [];

var current;

var stack = [];

var user;

function setup() {
	createCanvas(401, 401);
	cols = floor(width/w);
	rows = floor(width/w);

	user = new User();

	frameRate(500);
	//noLoop();

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i,j);
			grid.push(cell);
		}
	}

	current = grid[0];
}

function draw() {
	background(51);
	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	current.visited = true;
	current.highlight();
		//step 1
	var next = current.checkNeighbors();
	if (next) {
		next.visited = true;
		//step 2
		stack.push(current);

		//step 3
		removeWalls(current, next);
		//step 4
		current = next;
	} else if (stack.length > 0) {
		current = stack.pop();
	}

	//user.update();
	user.show();

}

function index(i,j) {
	if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
		return -1;
	}
	return i + j * cols;
}

function User() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 0;
	this.yspeed = 0;

	this.dir = function (x, y) {
		/*this.xspeed = x;
		this.yspeed = y;*/

		this.x += x*w;
		this.y += y*w;

		this.x = constrain(this.x, 0, width-w);
		this.y = constrain(this.y, 0, height-w);
	};

	this.update = function () {

		this.x = this.x + this.xspeed*w;
		this.y = this.y + this.yspeed*w;

		this.x = constrain(this.x, 0, width-w);
		this.y = constrain(this.y, 0, height-w);

	};

	this.show = function () {
		fill(255,0,0);
		rect(this.x, this.y, w, w);
	};
}

function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.walls = [true,true,true,true];
	this.visited = false;

	this.checkNeighbors = function () {
		var neighbors = [];

		var top     = grid[index(i, j-1)];
		var right   = grid[index(i+1, j)];
		var bottom  = grid[index(i, j+1)];
		var left    = grid[index(i-1, j)];

		if (top && !top.visited) {
			neighbors.push(top);
		}
		if (right && !right.visited) {
			neighbors.push(right);
		}
		if (bottom && !bottom.visited) {
			neighbors.push(bottom);
		}
		if (left && !left.visited) {
			neighbors.push(left);
		}

		if (neighbors.length > 0) {
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}
	};
	
	this.highlight = function () {
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill(0, 0, 255, 100);
		rect(x,y,w,w);
	};

	this.show = function () {
		var x = this.i*w;
		var y = this.j*w;
		stroke(255);
		if (this.walls[0]) {
			line(x,     y,      x+w,    y);
		}
		if (this.walls[1]) {
			line(x+w,   y,      x+w,    y+w);
		}
		if (this.walls[2]) {
			line(x+w,   y+w,    x,      y+w);
		}
		if (this.walls[3]) {
			line(x,     y+w,    x,      y);
		}

		if (this.visited) {
			noStroke();
			fill(255,0,255,100);
			rect(x,y,w,w);
		}
	}
}


function removeWalls(a, b) {
	var x = a.i - b.i;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
		//console.log(a);
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}

	var y = a.j - b.j;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}


function keyPressed() {
	/*if (keyCode === ENTER) {
		loop();
	} else if (keyCode === ESCAPE) {
		noLoop();
	}*/

	if (keyCode === UP_ARROW) {
		user.dir(0, -1);
	} else if (keyCode === DOWN_ARROW) {
		user.dir(0, 1);
	} else if (keyCode === LEFT_ARROW) {
		user.dir(-1, 0);
	} else if (keyCode === RIGHT_ARROW) {
		user.dir(1, 0);
	}

	//redraw();
}