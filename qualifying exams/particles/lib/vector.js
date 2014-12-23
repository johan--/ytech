function Vector(options) {
	this.start = arguments[0];
	this.end = arguments[1];
};

Vector.prototype.length = function() {
	return Math.sqrt(Math.pow((this.end.x - this.start.x), 2) + Math.pow((this.end.y - this.start.y), 2));
};

Vector.prototype.reverse = function() {
	return new Vector(
		{x: this.end.x, y: this.end.y},
		{x: this.start.x, y: this.start.y}
	);
};

Vector.prototype.normalize = function() {
	var k = 1 / this.length(),
		v = this.clone();

	for (var c in v.end) {
		v.end[c] = (v.end[c] - v.start[c]) * k + v.start[c];
	};

	return v;
};

Vector.prototype.sum = function() {
	var v = this.clone();

	for (var i = 0; i < arguments.length; i++) {
		v.end = v._calcEnd(arguments[i], v.end);
	};

	return v;
};

Vector.prototype.sub = function() {
	var v = this.clone();

	for (var i = 0; i < arguments.length; i++) {
		v.end = v._calcEnd(arguments[i].reverse(), v.end);
	};

	return v;
};

Vector.prototype._calcEnd = function(v, point) {
	var end = {x: this.end.x, y: this.end.y};

	for (var c in end) {
		end[c] = v.end[c] + (point[c] - v.start[c]);
	};

	return end;
};

Vector.prototype.dot = function(v) {
	p1 = this._calcEnd(this, {x: 0, y: 0});
	p2 = this._calcEnd(v, {x: 0, y: 0});

	return p1.x * p2.x + p1.y * p2.y;
};

Vector.prototype.multiply = function(value) {
	var v = this.clone();

	for (var c in v.end) {
		v.end[c] = v.start[c] + (v.end[c] - v.start[c]) * value;
	};

	return v;
};

Vector.prototype.clone = function() {
	return new Vector(
		{x: this.start.x, y: this.start.y},
		{x: this.end.x, y: this.end.y}
	);
};

Vector.prototype.proj = function(c) {
	return this.end[c] - this.start[c];
};

Vector.prototype.theta = function() {
	return Math.atan2(this.proj('y'), this.proj('x'));
};