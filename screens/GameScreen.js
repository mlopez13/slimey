
// Library import.
import mlopez13 from "../mlopez13/index.js";
const {Camera,
	Container,
	entity,
	Level,
	LevelSpace,
	math,
	Text} = mlopez13;

import Slimey from "../entities/Slimey.js";
import Toothy from "../entities/Toothy.js";

class GameScreen extends Container {
	
	constructor(game, controls, onOver) {
		
		super();
		
		const {w, h} = game;
		
		// LEVEL.
		const level = new Level(w, h);
		
		// SLIMEY.
		const slimey = new Slimey(controls);
		
		// CAMERA.
		const camera = new Camera(
			slimey,	// subject to follow.
			{w, h},	// viewport of camera (= that of the canvas).
			{w: level.w, h: level.h}	// world map size (= that of the level).
		);
		camera.add(level);
		camera.add(slimey);
		
		// Stats.
		this.stats = {
			sand: 0,
			maxSand: level.initialSand,
			life: 3
		}
		
		// SCORE.
		const scoreText = camera.add(new Text("SAND: 0/" + this.stats.maxSand, {
			font: "bold 20pt georgia",
			fill: "#FFFFFF",
			align: "left"
		}));
		scoreText.pos = {x: 18, y: 18};
		this.scoreText = scoreText;
		
		// LIFE.
		const lifeText = camera.add(new Text("LIFE:", {
			font: "bold 20pt georgia",
			fill: "#FFFFFF",
			align: "right"
		}));
		lifeText.pos = {x: w - 30 * (1.5 + 1.25*(this.stats.life - 1)) - 10, y: 18};
		
		const life = new Container();
		for (let i = 0; i < this.stats.life; i++) {
			const s = life.add(new Slimey());
			s.pos = {x: w - s.w * (1.5 + 1.25*i), y: s.w * 0.5};
			s.anims.play("idle");
		}
		camera.add(life);

		// ENEMIES.
		const toothies = addToothies(level);
		camera.add(toothies);

		// Add all to scene (now is GameScreen).
		this.add(camera);
		
		// Keep references.
		this.level = level;
		this.slimey = slimey;
		this.camera = camera;
		this.toothies = toothies;
		
		this.life = life;
		
		this.onOver = onOver;
		
	}
	
	update(dt, t) {
		super.update(dt, t);
		
		const {level, slimey, toothies, stats, life} = this;
		const {pos, dir, anims} = slimey;
		const {bounds: {left, right, top, bottom}} = level;
		
		// Confine player into bounds.
		pos.x = math.clamp(pos.x, left, right);
		pos.y = math.clamp(pos.y, top, bottom);
		
		// Animation.
		if ((pos.x == left || pos.x == right) && dir.y == 0 ||
			(pos.y == top || pos.y == bottom) && dir.x == 0) {
			anims.play("blink");
		} else {
			anims.play("roll");
		}
		
		// Ground.
		const ground = level.checkGround(entity.center(slimey));
		//~ if (ground === "space" && slimey.invincible <= 0) {
			//~ stats.life--;
			//~ slimey.invincible = 3;
			//~ if (stats.life == 0) {
				//~ this.onOver(stats);
			//~ } else {
				//~ life.remove(life.children[0]);
			//~ }
		//~ }
		if (ground === "sand becomes space") {
			stats.sand++;
			this.scoreText.text = "SAND: " + stats.sand + "/" + stats.maxSand;
		}
		
		// Toothies.
		toothies.map(b => {
			const {pos, xSpeed, ySpeed} = b;
			if (entity.distance(slimey, b) < 30 && slimey.invincible <= 0) {
				// Slimey got hit!
				stats.life--;
				slimey.invincible = 3;
				if (stats.life == 0) {
					this.onOver(stats);
				} else {
					life.remove(life.children[0]);
				}
				// Toothy goes offscreen.
				//~ if (b.xSpeed) pos.x = -level.w;
				//~ else pos.y = -level.h;
			}
			
			// Screen wrap.
			if (pos.x > level.w && xSpeed > 0) {
				pos.x = -30;
			}
			if (pos.y > level.h && ySpeed > 0) {
				pos.y = -30;
			}
			if (pos.x < -30 && xSpeed < 0) {
				pos.x = level.w;
			}
			if (pos.y < -30 && ySpeed < 0) {
				pos.y = level.h;
			}
		});
		
	}
}

/* FUNCTIONS */

function addToothies(level) {
	const toothies = new Container();
	
	for (let i = 4; i < level.mapH - 1; i++) {
		if (math.randOneIn(2)) {
			const dir = 2*math.rand(2) - 1;
			const t = toothies.add(new Toothy(dir*30*5, 0));
			t.pos.x = (1 - dir)/2*level.w - dir*math.rand(1, 5)*30;
			t.pos.y = i*level.tileH;
		}
	}
	
	for (let j = 3; j < level.mapW - 1; j++) {
		if (math.randOneIn(2)) {
			const dir = 2*math.rand(2) - 1;
			const t = toothies.add(new Toothy(0, dir*30*5));
			t.pos.x = j*level.tileW;
			t.pos.y = (1 - dir)/2*level.h - dir*math.rand(1, 5)*30;
		}
	}
	
	return toothies;
}

export default GameScreen;
