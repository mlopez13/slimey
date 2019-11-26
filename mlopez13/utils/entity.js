
import math from "./math.js";

// Returns center of an entity given its pos (top-left pixel), w and h.
function center(entity) {
	const {pos, w, h} = entity;
	return {
		x: pos.x + w/2,
		y: pos.y + h/2
	};
}

// Returns distance between two entities.
function distance(a, b) {
	return math.distance(center(a), center(b));
}

export default {
	center,
	distance
};
