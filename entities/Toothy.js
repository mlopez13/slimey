
// Libraries.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles-t.png");
// Width and length of toothy.
const w = 30;
const h = 30;

// --------
// --------
// --------
// TOOTHY.

class Toothy extends TileSprite {
	
	constructor(xSpeed, ySpeed) {
		
		super(texture, w, h);
		
		this.w = w;
		this.h = h;
		
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		
		// Animation.
		this.anims.add("look",
			[0, 1, 2, 3,
			3, 2, 1, 0].map(x => ({x, y: 0})), 0.1);
		this.anims.play("look");
		
	}
	
	update(dt) {
		const {pos, xSpeed, ySpeed} = this;
		pos.x += xSpeed*dt;
		pos.y += ySpeed*dt;
		
		super.update(dt);
	}
	
}

export default Toothy;
