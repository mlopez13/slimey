
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, FRUIT_Y, FRUIT_TYPE} from "../constants/index.js";

// --------
// --------
// --------
// FRUIT.

class Fruit extends TileSprite {
	
	constructor(type) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		// Type: APPLE, ORANGE, PEAR, BANANA
		this.type = type;
		
		const typeIndex = FRUIT_TYPE.indexOf(type);
		
		if (typeIndex == -1) {
			alert("Specify the type of fruit, please.");
		} else {
			this.frame = {x: typeIndex, y: FRUIT_Y};
		}
		
	}
	
}

export default Fruit;
