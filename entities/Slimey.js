
// Library.
import mlopez13 from "../mlopez13/index.js";
const {math, Texture, TileSprite} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, SLIMEY_ROLL_Y, SLIMEY_BLINK_Y, SLIMEY_IDLE_Y} from "../constants/index.js";

// --------
// --------
// --------
// SLIMEY.

class Slimey extends TileSprite {
	
	constructor(controls) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		// Controls.
		this.controls = controls;
		
		// Set initial position, direction and speed.
		this.pos = {x: TILE_W, y: 2 * TILE_H};
		this.dir = {x: -1, y: 0};
		this.speed = 0.2;
		
		// Animations.
		const {anims} = this;
		anims.add("roll", [0, 1, 2, 3].map(x => ({x, y: SLIMEY_ROLL_Y})), 0.1);
		anims.add("blink", [0, 1, 2, 3, 3, 2, 1, 0].map(x => ({x, y: SLIMEY_BLINK_Y})), 0.05);
		anims.add("idle", [0, 1, 2, 3, 3, 2, 1, 0].map(x => ({x, y: SLIMEY_IDLE_Y})), 0.05);
		anims.play("blink");
		
		// Invincibility.
		this.invincible = 0;
		this.visible = true;
		
	}
	
	update(dt, t) {
		
		if (this.controls) {
		
			const {w, h, controls, pos, speed, dir, anims} = this;
			
			// Movement.
			if (controls.x && controls.x !== dir.x) {
				// Change horizontal direction.
				dir.x = controls.x;
				dir.y = 0;
				// Snapping y.
				pos.y = Math.round(pos.y / h) * h;
			} else if (controls.y && controls.y !== dir.y) {
				// Change vertical direction.
				dir.x = 0;
				dir.y = controls.y;
				// Snapping x.
				pos.x = Math.round(pos.x / w) * w;
			}
			pos.x += dir.x * dt * (w / speed);
			pos.y += dir.y * dt * (h / speed);
			
			// Invincibility.
			if (this.invincible > 0) {
				this.visible = Math.floor(10 * t) % 2;
				this.invincible -= dt;
			} else {
				this.visible = true;
			}
			
		}
		
		// TileSprite update.
		super.update(dt);
		
	}
	
}

export default Slimey;
