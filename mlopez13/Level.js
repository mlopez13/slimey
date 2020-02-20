
import math from "./utils/math.js";
import Texture from "./Texture.js";
import TileMap from "./TileMap.js";

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, SPACE_Y, BLOCK_Y, SAND_Y} from "../constants/index.js";

class Level extends TileMap {
	
	constructor(w, h) {
		
		// Tile map setup.
		const tileSize = 30;
		const mapW = Math.floor(w / tileSize);
		const mapH = Math.floor(h / tileSize);
		
		var initialSand = 0;
		
		// Level.
		const level = [];
		
		for (let i = 0; i < mapH; i++) {
			for (let j = 0; j < mapW; j++) {
				// Walls.
				if (i == 0 || i == mapH - 3) {
					level.push({x: 0, y: BLOCK_Y});
					continue;
				}
				if (i == mapH - 2 || i == mapH - 1) {
					level.push({x: 2, y: BLOCK_Y});
					continue;
				}
				if (j == 0 || j == mapW - 1) {
					level.push({x: 1, y: BLOCK_Y});
					continue;
				}
				//~ if (i == 1) {
					//~ level.push({x: 2, y: BLOCK_Y});
				//~ }
				else {
					if (math.randOneIn(4) && (i > 2 || j > 2)) {
						// Sand.
						level.push({x: math.rand(4), y: SAND_Y});
						initialSand++;
					} else {
						// Space
						level.push({x: math.rand(4), y: SPACE_Y});
					}
				}
			}
		}
		
		super(level, mapW, mapH, tileSize, tileSize, texture);
		
		this.initialSand = initialSand;
		
		// Bounds.
		this.bounds = {
			left: tileSize,
			right: w - tileSize*2,
			top: tileSize,
			bottom: h - tileSize*4
		};
		
	}
	
}

export default Level;
