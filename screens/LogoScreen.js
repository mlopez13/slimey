
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Container, Sprite, Text, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/space.png");

// --------
// --------
// --------
// LOGO SCREEN.

class LogoScreen extends Container {
	
	constructor(game, nextScreen) {
		
		// Container constructor.
		super();
		
		// Add space.
		this.add(new Sprite(texture));
		
		// Add text.
		const text = this.add(new Text("a mlopez13 game",
			{font: "bold 20pt georgia", fill: "#FFFFFF", align: "center"},
			{font: "bold 25pt georgia", fill: "#000000", align: "center"}
		));
		text.pos = {x: game.w/2, y: game.h/2 - 20};
		
		// Add life and reference to next screen.
		this.life = 3;
		this.nextScreen = nextScreen;
		
	}
	
	update(dt, t) {
		
		const {nextScreen} = this;
		
		// Timer.
		this.life -= dt;
		if (this.life < 0) {
			nextScreen();
		}
		
	}
}

export default LogoScreen;
