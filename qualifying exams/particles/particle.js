function Particle(x, y, r, angle) {
	this.y = y;
	this.x = x;
	this.r = r;
	this.s = 10 / Math.log(r);
	this.v = Math.PI * r * r;
	this.angle = angle;
};

Particle.prototype.set = function(propName, value) {
	this[propName] = value;
};

Particle.prototype.get = function(propName) {
	return this[propName];
};

Particle.prototype.setSpeed = function(r) {
	this.set('s', 10 / Math.log(r));
};

Particle.prototype.setVolume = function(r) {
	this.set('v', Math.PI * r * r);
};

Particle.prototype.random = function(size, maxR, method) {
	var minR = 5,
		maxR = maxR || 20,
		border = 2,
		r;

	r = method(minR, maxR) + border;

	this.set('r', r);
	this.set('y', method(r, size - r));
	this.set('x', method(r, size - r));
	this.set('angle', method(0, Math.PI * 2));
	this.setSpeed(r);
	this.setVolume(r);
};

Particle.prototype.move = function(size, collideK) {
	var collideK = collideK || 1,
		x = this.x + collideK * this.s * Math.cos(this.angle),
		y = this.y + collideK * this.s * Math.sin(this.angle),
		nx1 = x - this.r,
		nx2 = x + this.r,
		ny1 = y - this.r,
		ny2 = y + this.r;

	if (nx2 >= size) x = size - this.r;
	if (nx1 <= 0) x = this.r;
	if (ny2 >= size) y = size - this.r;
	if (ny1 <= 0) y = this.r;

	this.set('x', x);
	this.set('y', y);
};