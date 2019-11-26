
import mlopez13 from "../mlopez13/index.js";
const {Container, Level, Sprite, Text, Texture} = mlopez13;

const textureSpace = new Texture("res/images/space.png");

class GameOverScreen extends Container {
	
	constructor(game, controls, stats, onTitle) {
		super();
		
		this.game = game;
		this.controls = controls;
		this.stats = stats;
		this.onTitle = onTitle;
		
		const iniY = game.h / 2 - 100;
		
		controls.reset();
		
		const space = this.add(new Sprite(textureSpace));
		
		// GAME OVER title.
		const title = new Text("GAME OVER.", {			
			font: "bold 50pt georgia",
			fill: "red",
			align: "center"
		});
		title.pos = {x: game.w/2, y: iniY};
		this.add(title);
		
		// SCORE.
		const score = new Text("Sand collected: " + stats.sand + "/" + stats.maxSand +
			" (" + (stats.sand/stats.maxSand*100).toFixed(0) + "%)", {			
				font: "bold 20pt georgia",
				fill: "yellow",
				align: "center"
		});
		score.pos = {x: game.w/2, y: iniY + 120};
		this.add(score);
		
		const spacebar = this.add(new Container());
		spacebar.visible = false;
		makeSpacebar(spacebar, game);
		this.spacebar = spacebar;
		
		// Keep reference.
		this.iniY = iniY;
		this.title = title;
	}
	
	update(dt, t) {
		super.update(dt, t);
		
		const {iniY, title, controls} = this;
		
		title.pos.y = iniY + 20*Math.sin(2*t);
		
		if (controls.action) {
			this.onTitle();
		}
		
		this.spacebar.visible = Math.floor(2*t) % 2;
	}

}

function makeSpacebar(spacebar, game) {
	
	const message = spacebar.add(new Text(
		"Press SPACEBAR to replay!",
	{
		font: "bold 20pt georgia",
		fill: "red",
		align: "center"
	}));
	message.pos = {x: game.w/2, y: 400};
	
}

export default GameOverScreen;
