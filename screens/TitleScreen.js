
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Container, math, Sprite, Text, Texture, TileSprite} = mlopez13;

// Entities.
import Slimey from "../entities/Slimey.js";
import Toothy from "../entities/Toothy.js";

// Textures.
const texture = {
	bg: new Texture("res/images/tiles.png"),
	space: new Texture("res/images/space.png")
};

// Constants.
import {TILE_W, TILE_H, SAND_Y} from "../constants/index.js";

// --------
// --------
// --------
// TITLE SCREEN.

class TitleScreen extends Container {
	
	constructor(game, controls, nextScreen) {
		
		// Container constructor.
		super();
		
		// Width and length.
		const {w, h} = game;
		
		// Controls and next screen references.
		this.controls = controls;
		controls.reset();
		this.nextScreen = nextScreen;
		
		// Add space.
		this.add(new Sprite(texture.space));
		
		// Add title.
		const title = this.add(new Text("SLIMEY",
			{font: "bold 75pt georgia", fill: "#ADFF2F", align: "center"},
			{font: "bold 77pt georgia", fill: "#00C000", align: "center"}
		));
		title.pos = {x: w / 2, y: h / 2 - 75};
		
		// Add description.
		const desc = this.add(new Container());
		desc.visible = false;
		makeDescription(desc, game);
		
		// Add message.
		const message = this.add(new Text("Press SPACEBAR to start!",
			{font: "bold 20pt georgia", fill: "red", align: "center"}
		));
		message.visible = false;
		message.pos = {x: w / 2, y: h - 80};
		
		// Keep references.
		this.title = title;
		this.desc = desc;
		this.message = message;
		
		// Timer variables.
		this.titleLife = 1;
		this.descLife = 1;
		
	}
	
	update(dt, t) {
		
		// Container update.
		super.update(dt, t);
		
		const {controls, nextScreen, title, desc, message} = this;
		
		// Go to next screen if SPACEBAR is hit.
		if (controls.action) {
			nextScreen();
		}
		
		// Title movement and visibility of description and message.
		if (title.pos.y > 60) {
			if (this.titleLife > 0) {
				this.titleLife -= dt;
			} else {
				title.pos.y -= 100 * dt;
			}
		} else {
			title.pos.y = 60;
			desc.visible = true;
			if (this.descLife > 0) {
				this.descLife -= dt;
			} else {
				message.visible = Math.floor(2 * t) % 2;
			}
		}
		
	}

}

export default TitleScreen;



// --------
// --------
// --------
// FUNCTIONS

function makeDescription(desc, game) {
	
	// Width and length.
	const {w, h} = game;
	
	const descX = w / 2 - 250;
	const descY = h / 2 - 50;
	
	// (1) First line.
	const desc0 = desc.add(new Text("This is SLIMEY:",
		{font: "bold 20pt georgia", fill: "#FFFFFF", align: "left"},
		{font: "bold 25pt impact", fill: "#000000", align: "left"}
	));
	desc0.pos = {x: descX, y: descY};
	// Add slimey.
	const slimey = desc.add(new Slimey());
	slimey.pos = {x: 300, y: descY - 5};
	
	// (2) Second line.
	const desc1 = desc.add(new Text("Use the arrow keys to move it.",
		{font: "bold 20pt georgia", fill: "#FFFFFF", align: "left"},
		{font: "bold 25pt impact", fill: "#000000", align: "left"}
	));
	desc1.pos = {x: descX, y: descY + 50};
	
	// (3) Third line.
	const desc2 = desc.add(new Text("Avoid touching a TOOTHY:",
		{font: "bold 20pt georgia", fill: "#FFFFFF", align: "left"},
		{font: "bold 25pt impact", fill: "#000000", align: "left"}
	));
	desc2.pos = {x: descX, y: descY + 100};
	// Add toothy.
	const toothy = desc.add(new Toothy(0, 0));
	toothy.pos = {x: 450, y: descY + 95};
	
	// (4) Fourth line.
	const desc3 = desc.add(new Text("and collect all SAND:",
		{font: "bold 20pt georgia", fill: "#FFFFFF", align: "left"},
		{font: "bold 25pt impact", fill: "#000000", align: "left"
	}));
	desc3.pos = {x: descX, y: descY + 150};
	// Add sand.
	const sand = desc.add(new TileSprite(texture.bg, TILE_W, TILE_H));
	sand.frame = {x: 3, y: SAND_Y};
	sand.pos = {x: 380, y: descY + 145};
	
}
