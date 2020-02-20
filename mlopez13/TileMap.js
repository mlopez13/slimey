
import Container from "./Container.js";
import math from "./utils/math.js";
import TileSprite from "./TileSprite.js";

// Constants.
import {SPACE_Y} from "../constants/index.js";

class TileMap extends Container {
	
	constructor(tiles, mapW, mapH, tileW, tileH, texture) {
		
		// tiles is an array of frame data to draw: [{x: 1, y: 0}, ...].
		// mapW is the width of the map in tiles (number of columns),
		// mapH is the height of the map in tiles (number of rows), so:
		// tiles.length = mapW * mapH.
		
		super(); // Gets pos.x, pos.y, children = [].
		this.mapW = mapW; // Width in tiles.
		this.mapH = mapH; // Height in tiles.
		this.tileW = tileW;
		this.tileH = tileH;
		this.w = mapW * tileW; // Width in pixels.
		this.h = mapH * tileH; // Height in pixels.
		
		// Add TileSprites.
		this.children = tiles.map((frame, i) => {
			const s = new TileSprite(texture, tileW, tileH);
			s.frame = frame;
			s.pos.x = (i % mapW) * tileW;
			s.pos.y = Math.floor(i / mapW) * tileH;
			return s;
		});
	}
	
	// From pixel to map position.
	pixelToMapPos(pos) {
		const {tileW, tileH} = this;
		return {
			x: Math.floor(pos.x / tileW),
			y: Math.floor(pos.y / tileH)
		};
	}
	
	// From map to pixel position.
	mapToPixelPos(mapPos) {
		const {tileW, tileH} = this;
		return {
			x: mapPos.x * tileW,
			y: mapPos.y * tileH
		};
	}
	
	// Get tile at some map position.
	tileAtMapPos(mapPos) {
		return this.children[mapPos.y * this.mapW + mapPos.x];
	}
	
	tileAtPixelPos(pos) {
		return this.tileAtMapPos(this.pixelToMapPos(pos));
	}
	
	// Set tile at some map position.
	setFrameAtMapPos(mapPos, frame) {
		const tile = this.tileAtMapPos(mapPos);
		tile.frame = frame;
		return tile;
	}
	
	setFrameAtPixelPos(pos, frame) {
		return this.setFrameAtMapPos(this.pixelToMapPos(pos), frame);
	}
	
	// Check ground to decide if tile has to be changed or not.
	checkGround(pos) {
		const {lastTile} = this;
		const tile = this.tileAtPixelPos(pos);
		if (lastTile === tile) {
			return "safe";
		}
		this.lastTile = tile;
		if (tile.frame.y != SPACE_Y) {
			this.setFrameAtPixelPos(pos, {x: math.rand(4), y: SPACE_Y});
			return "sand becomes space";
		}
		return "space";
	}
}

export default TileMap;
