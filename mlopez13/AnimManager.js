
import Anim from "./Anim.js";

class AnimManager {
	constructor(e) {
		// List of animation sequences:
		this.anims = {};
		
		this.running = false;
		this.frameSource = e.frame || e;
		this.current = null;
	}
	
	add(name, frames, speed) {
		this.anims[name] = new Anim(frames, speed);
		return this.anims[name];
	}
	
	// The argument "anim" here is a String.
	play(anim) {
		const {current, anims} = this;
		if (anim === current) {
			return;
		}
		// Current animation.
		this.current = anim;
		anims[anim].reset();
	}
	
	stop() {
		this.current = null;
	}
	
	update(dt) {
		const {current, anims, frameSource} = this;
		
		// If current is null.
		if (!current) {
			return;
		}
		
		const anim = anims[current];
		anim.update(dt);
		
		frameSource.x = anim.frame.x;
		frameSource.y = anim.frame.y;
	}
}

export default AnimManager;
