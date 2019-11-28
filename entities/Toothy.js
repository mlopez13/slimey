
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, TOOTHY_Y} from "../constants/index.js";

// --------
// --------
// --------
// TOOTHY.

class Toothy extends TileSprite {
	
	constructor(xSpeed, ySpeed) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		// Speed.
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		
		// Animation.
		this.anims.add("look", [0, 1, 2, 3, 3, 2, 1, 0].map(x => ({x, y: TOOTHY_Y})), 0.1);
		this.anims.play("look");
		
	}
	
	update(dt) {
		
		const {pos, xSpeed, ySpeed} = this;
		
		// Movement.
		pos.x += xSpeed * dt;
		pos.y += ySpeed * dt;
		
		// TileSprite update.
		super.update(dt);
		
	}
	
}

export default Toothy;
