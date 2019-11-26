
import mlopez13 from "../mlopez13/index.js";
const {Container, Sprite, Text, Texture} = mlopez13;

const texture = new Texture("res/images/space.png");

class LogoScreen extends Container {
	
	constructor(game, onDone) {
		
		super();
		
		this.onDone = onDone;
		
		this.life = 3;
		const logo = this.add(new Sprite(texture));
		
		const title1 = this.add(new Text("a mlopez13 game", {
			font: "bold 20pt georgia",
			fill: "#FFFFFF",
			align: "center"
		}, {
			font: "bold 25pt georgia",
			fill: "#000000",
			align: "center"
		}));
		title1.pos = {x: game.w/2, y: game.h/2 - 20};
		
	}
	
	update(dt, t) {
		
		super.update(dt, t);
		
		this.life -= dt;
		
		if (this.life < 0) {
			this.onDone();
		}
		
	}
}

export default LogoScreen;
