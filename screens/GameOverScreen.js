
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Container, Level, Sprite, Text, Texture} = mlopez13;

// Texture.
const textureSpace = new Texture("res/images/space.png");

// Constants.
import {GAME_H} from "../constants/index.js";
const titleY = GAME_H / 2 - 100;

// --------
// --------
// --------
// GAME OVER SCREEN.

class GameOverScreen extends Container {
	
	constructor(game, controls, stats, nextScreen) {
		
		// Container constructor.
		super();
		
		// Width and length.
		const {w, h} = game;
		
		// Controls and next screen references.
		this.controls = controls;
		controls.reset();
		this.nextScreen = nextScreen;
		
		// Add space.
		const space = this.add(new Sprite(textureSpace));
		
		if (stats.sand == stats.maxSand) {
			const title = this.add(new Text("YOU DID IT!!!",
				{font: "bold 50pt georgia", fill: "#ADFF2F", align: "center"},
				{font: "bold 51pt georgia", fill: "#00C000", align: "center"}
			));
			title.pos = {x: w / 2, y: titleY};
			this.title = title;
		} else {
			const title = this.add(new Text("GAME OVER.",
				{font: "bold 50pt georgia", fill: "red", align: "center"},
				{font: "bold 51pt georgia", fill: "#8B0000", align: "center"}
			));
			title.pos = {x: w / 2, y: titleY};
			this.title = title;
		}
		
		// SCORE.
		const score = new Text("Sand collected: " + stats.sand + "/" + stats.maxSand + " (" +
			(stats.sand/stats.maxSand*100).toFixed(0) + "%)",
			{font: "bold 20pt georgia", fill: "white", align: "center"}
		);
		score.pos = {x: w / 2, y: titleY + 120};
		this.add(score);
		
		const message = this.add(new Text("Press SPACEBAR to replay!",
			{font: "bold 20pt georgia", fill: "yellow", align: "center"}
		));
		message.visible = false;
		message.pos = {x: w / 2, y: h - 80};
		this.message = message;
		
	}
	
	update(dt, t) {
		
		const {title, message, controls} = this;
		
		// Title movement and message visibility.
		title.pos.y = titleY + 20 * Math.sin(2 * t);
		this.message.visible = Math.floor(2*t) % 2;
		
		// Go to next screen if SPACEBAR is hit.
		if (controls.action) {
			this.nextScreen();
		}
		
	}

}

export default GameOverScreen;
