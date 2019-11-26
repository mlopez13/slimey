
import math from "./utils/math.js";
import Texture from "./Texture.js";
import TileMap from "./TileMap.js";

// Load texture.
const texture = new Texture("res/images/bg.png");

class Level extends TileMap {
	constructor(w, h) {
		
		// Tile map setup.
		const tileSize = 30;
		const mapW = Math.floor(w / tileSize);
		const mapH = Math.floor(h / tileSize);

		// Random level.
		const level = [];
		for (let y = 0; y < mapH; y++) {
			for (let x = 0; x < mapW; x++) {
				level.push({x: math.rand(4), y: 0});
			}
		}
		
		super(level, mapW, mapH, tileSize, tileSize, texture);
		
		// Bounds.
		this.bounds = {
			left: tileSize,
			right: w - tileSize*2,
			top: tileSize*2,
			bottom: h - tileSize*2
		};
		
	}
	
}

export default Level;
