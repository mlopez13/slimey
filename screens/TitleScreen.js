
import mlopez13 from "../mlopez13/index.js";
const {Container, math, Sprite, Text, Texture, TileSprite} = mlopez13;

import Slimey from "../entities/Slimey.js";
import Toothy from "../entities/Toothy.js";

const textureSpace = new Texture("res/images/space.png");
const textureBg = new Texture("res/images/tiles-bg.png");

var tNow = 0;

class TitleScreen extends Container {
	
	constructor(game, controls, onStart) {
		super();
		this.onStart = onStart;
		this.controls = controls;
		controls.reset();
		
		const space = this.add(new Sprite(textureSpace));
		
		const title = this.add(new Container());
		this.titleY = game.h/2 - 50;
		title.pos = {x: game.w/2, y: this.titleY};
		makeTitle(title, game);
		this.title = title;
		
		const desc = this.add(new Container());
		desc.visible = false;
		makeDescription(desc, game);
		this.desc = desc;
		
		const spacebar = this.add(new Container());
		spacebar.visible = false;
		makeSpacebar(spacebar, game);
		this.spacebar = spacebar;
		
		this.titleTime = 1;
		this.titleLife = this.titleTime;
		this.descTime = 2;
		
		tNow = 0;
	}
	
	update(dt, t) {
		
		super.update(dt, t);
		const {controls, title, titleY, titleTime, desc, descTime, spacebar} = this;
		
		if (controls.action) {
			this.onStart();
		}
		
		if (title.pos.y > 60) {
			if (this.titleLife > 0) {
				this.titleLife -= dt;
			} else {
				title.pos.y = titleY - (titleY - 55)/(1 + Math.exp(5*(descTime - tNow)));
				tNow += dt;
			}
		} else {
			title.pos.y = 60;
			desc.visible = true;
			spacebar.visible = Math.floor(2*t) % 2;
		}
		
	}

}

export default TitleScreen;



// FUNCTIONS

function makeTitle(title, game) {
	
	const title0 = title.add(new Text("SLIMEY", {
		font: "bold 75pt georgia",
		fill: "#ADFF2F",
		align: "center"
	}, {
		font: "bold 77pt georgia",
		fill: "#00C000",
		align: "center"
	}));
	
}

function makeDescription(desc, game) {
	
	const topY = 190;
	
	const desc0 = desc.add(new Text(
		"This is SLIMEY:",
	{
		font: "bold 20pt georgia",
		fill: "#FFFFFF",
		align: "left"
	}, {
		font: "bold 25pt impact",
		fill: "#000000",
		align: "left"
	}));
	desc0.pos = {x: 70, y: topY};
	
	const slimey = desc.add(new Slimey());
	slimey.pos = {x: 300, y: topY - 5};
	
	const desc1 = desc.add(new Text(
		"Use the arrow keys to move it.",
	{
		font: "bold 20pt georgia",
		fill: "#FFFFFF",
		align: "left"
	}, {
		font: "bold 25pt impact",
		fill: "#000000",
		align: "left"
	}));
	desc1.pos = {x: 70, y: topY + 50};
	
	const desc2 = desc.add(new Text(
		"Avoid touching a TOOTHY:",
	{
		font: "bold 20pt georgia",
		fill: "#FFFFFF",
		align: "left"
	}, {
		font: "bold 25pt impact",
		fill: "#000000",
		align: "left"
	}));
	desc2.pos = {x: 70, y: topY + 100};
	
	const toothy = desc.add(new Toothy(0, 0));
	toothy.pos = {x: 450, y: topY + 95};
	
	const desc3 = desc.add(new Text(
		"and collect all SAND:",
	{
		font: "bold 20pt georgia",
		fill: "#FFFFFF",
		align: "left"
	}, {
		font: "bold 25pt impact",
		fill: "#000000",
		align: "left"
	}));
	desc3.pos = {x: 70, y: topY + 150};
	
	const space = desc.add(new TileSprite(textureBg, 30, 30));
	space.frame = {x: 3, y: 2};
	space.pos = {x: 380, y: topY + 145};
	
}

function makeSpacebar(spacebar, game) {
	
	const message = spacebar.add(new Text(
		"Press SPACEBAR to start!",
	{
		font: "bold 20pt georgia",
		fill: "red",
		align: "center"
	}));
	message.pos = {x: game.w/2, y: 400};
	
}
