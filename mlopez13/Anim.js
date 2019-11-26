

class Anim {
	constructor(frames, rate) {
		this.frames = frames;
		this.rate = rate;
		this.reset();
	}
	
	update(dt) {
		const {rate, frames} = this;
		if ((this.curTime += dt) > rate) {
			this.curFrame++;
			// Change of frame.
			this.frame = frames[this.curFrame % frames.length];
			this.curTime -= rate;
		}
	}
		
	reset() {
		this.frame = this.frames[0];
		this.curFrame = 0;
		this.curTime = 0;
	}
}

export default Anim;
