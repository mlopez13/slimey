
class Anim {
	
	constructor(frames, rate) {
		this.frames = frames;
		this.rate = rate;
		this.reset();
	}
	
	update(dt) {
		const {frames, rate} = this;
		if ((this.curTime += dt) > rate) {
			this.curFrame = (this.curFrame + 1) % frames.length;
			// Change of frame.
			this.frame = frames[this.curFrame];
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
