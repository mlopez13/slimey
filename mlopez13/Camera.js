
import Container from "./Container.js";
import math from "./utils/math.js";

class Camera extends Container {
	
	// subject is what the camera follows, like an entity.
	// viewport is an object with width and height, the camera screen.
	// worldSize is also an object with width and height, but it represents the entire world map.
	constructor(subject, viewport, worldSize = viewport) {
		
		super();
		this.w = viewport.w;
		this.h = viewport.h;
		this.worldSize = worldSize;
		this.setSubject(subject);
		
	}
	
	// The subject can be an entity (pos, w, h) or a position.
	setSubject(e) {
		this.subject = e ? e.pos || e : this.pos;
		this.offset = {x: 0, y: 0};
		
		// Center on the entity.
		if (e && e.w) {
			this.offset.x += e.w / 2;
			this.offset.y += e.h / 2;
		}
		if (e && e.anchor) {
			this.offset.x -= e.anchor.x;
			this.offset.y -= e.anchor.y;
		}
	}
	
	focus() {
		const {pos, w, h, worldSize, subject, offset} = this;
		
		const centeredX = subject.x + offset.x - w/2;
		const maxX = worldSize.w - w;
		const x = -math.clamp(centeredX, 0, maxX);
		
		const centeredY = subject.y + offset.y - h/2;
		const maxY = worldSize.h - h;
		const y = -math.clamp(centeredY, 0, maxY);
		
		pos.x = x;
		pos.y = y;
	}
	
	update(dt, t) {
		super.update(dt, t);
		if (this.subject) {
			this.focus();
		}
	}
}

export default Camera;
