
// Libraries.
import mlopez13 from "../mlopez13/index.js";
const {math, TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles-s.png");
// Width and length of slimey.
const w = 30;
const h = 30;

// --------
// --------
// --------
// SLIMEY.

class Slimey extends TileSprite {
	
	constructor(controls) {
		
		// TileSprite constructor.
		super(texture, w, h);
		
		// Width and length.
		this.w = w;
		this.h = h;
		
		// Set position.
		this.pos = {x: w, y: 2*h};
		
		// Controls.
		if (controls) {
			this.controls = controls;
		}
		
		// Speed.
		this.speed = 0.2;
		this.dir = {
			x: -1,
			y: 0
		};
		
		// Animation.
		const {anims} = this;
		anims.add("idle", [{x: 0, y: 0}, {x: 0, y: 1}], 0.2);
		anims.add("roll", [0, 1, 2, 3].map(x => ({x, y: 0})), 0.1);
		anims.add("blink",
			[{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1},
			{x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 0, y: 0}],
			0.05);
		anims.play("blink");
		
		this.invincible = 0;
		this.visible = true;
	}
	
	update(dt, t) {
		if (this.controls) {
		
			const {pos, speed, controls: {x, y}, anims, dir} = this;
			
			// Movement.
			if (x && x !== dir.x) {
				// Change to horizontal movement.
				dir.x = x;
				dir.y = 0;
				pos.y = Math.round(pos.y / h) * h;
			} else if (y && y !== dir.y) {
				// Change to vertical movement.
				dir.x = 0;
				dir.y = y;
				pos.x = Math.round(pos.x / w) * w;
			}
			pos.x += dir.x * dt * (w / speed);
			pos.y += dir.y * dt * (h / speed);
			
			// Invincibility.
			if (this.invincible > 0) {
				this.visible = Math.floor(10*t) % 2;
				this.invincible -= dt;
			} else {
				this.visible = true;
			}
		}
		
		super.update(dt);
	}
	
}

export default Slimey;
