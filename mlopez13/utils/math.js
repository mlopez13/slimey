
// Return random integer.
function rand(min, max) {
	return Math.floor(randf(min, max));
}

// Return random float.
function randf(min, max) {
	if (max == null) {
		max = min || 1;
		min = 0;
	}
	return min + (max - min)*Math.random();
}

// Return true with some probability.
function randOneIn(max = 2) {
	return rand(0, max) === 0;
}

// Return random element from an array.
function randOneFrom(items) {
	return items[rand(items.length)];
}

// Return distance between two points.
function distance(a, b) {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.sqrt(dx*dx + dy*dy);
}

// Returns x between min and max.
function clamp(x, min, max) {
	return Math.max(min, Math.min(x, max));
}

export default {
	clamp,
	distance,
	rand,
	randf,
	randOneFrom,
	randOneIn
};
