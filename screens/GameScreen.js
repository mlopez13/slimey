
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Container, entity, Level, math, Text} = mlopez13;

// Entities.
import Slimey from "../entities/Slimey.js";
import Toothy from "../entities/Toothy.js";

// Constants.
import {TILE_W, TILE_H} from "../constants/index.js";

// --------
// --------
// --------
// GAME SCREEN.

class GameScreen extends Container {
	
	constructor(game, controls, nextScreen) {
		
		// Container constructor.
		super();
		
		// Width and length.
		const {w, h} = game;
		
		// LEVEL.
		const level = this.add(new Level(w, h));
		
		// SLIMEY.
		const slimey = this.add(new Slimey(controls));
		
		// Stats.
		this.stats = {
			sand: 0,
			maxSand: level.initialSand,
			life: 3
		};
		
		// SCORE.
		const scoreText = this.add(new Text("SAND: 0/" + this.stats.maxSand,
			{font: "bold 20pt georgia", fill: "#FFFFFF", align: "left"}
		));
		scoreText.pos = {x: TILE_W / 2, y: TILE_H / 2};
		this.scoreText = scoreText;
		
		// LIFE.
		const lifeText = this.add(new Text("LIFE:",
			{font: "bold 20pt georgia", fill: "#FFFFFF", align: "right"}
		));
		lifeText.pos = {x: w - 1.5 * TILE_W - 1.25 * TILE_W * this.stats.life, y: TILE_H / 2};
		
		const life = new Container();
		for (let i = 0; i < this.stats.life; i++) {
			const s = life.add(new Slimey());
			s.pos = {x: w - 1.5 * TILE_W - 1.25 * TILE_W * i, y: TILE_H / 2};
			s.anims.play("idle");
		}
		this.add(life);

		// ENEMIES.
		const toothies = addToothies(level);
		this.add(toothies);
		
		// Keep references.
		this.level = level;
		this.slimey = slimey;
		this.toothies = toothies;
		
		this.life = life;
		
		this.nextScreen = nextScreen;
		
	}
	
	update(dt, t) {
		
		// Container update.
		super.update(dt, t);
		
		const {level, slimey, toothies, stats, life} = this;
		const {pos, dir, anims} = slimey;
		const {bounds: {left, right, top, bottom}} = level;
		
		// Confine slimey into bounds.
		pos.x = math.clamp(pos.x, left, right);
		pos.y = math.clamp(pos.y, top, bottom);
		
		// Animation.
		if ((pos.x == left || pos.x == right) && dir.y == 0 || (pos.y == top || pos.y == bottom) && dir.x == 0) {
			anims.play("blink");
		} else {
			anims.play("roll");
		}
		
		// Ground.
		const ground = level.checkGround(entity.center(slimey));
		if (ground === "sand becomes space") {
			stats.sand++;
			this.scoreText.text = "SAND: " + stats.sand + "/" + stats.maxSand;
			if (stats.sand == stats.maxSand) {
				// CONGRATULATIONS!
				this.nextScreen(stats);
			}
		}
		
		// Toothies.
		toothies.map(t => {
			
			const {pos, xSpeed, ySpeed} = t;
			
			if (entity.distance(slimey, t) < 30 && slimey.invincible <= 0) {
				
				// Slimey got hit!
				stats.life--;
				slimey.invincible = 3;
				
				if (stats.life == 0) {
					// GAME OVER, man.
					this.nextScreen(stats);
				} else {
					life.remove(life.children[0]);
				}
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

export default GameScreen;



// --------
// --------
// --------
// FUNCTIONS

function addToothies(level) {
	
	const toothies = new Container();
	
	for (let i = 4; i < level.mapH - 1; i++) {
		if (math.randOneIn(2)) {
			const dir = 2 * math.rand(2) - 1;
			const t = toothies.add(new Toothy(5 * 30 * dir, 0));
			t.pos.x = (1 - dir) / 2 * level.w - 30 * dir * math.rand(1, 5);
			t.pos.y = i * level.tileH;
		}
	}
	
	for (let j = 3; j < level.mapW - 1; j++) {
		if (math.randOneIn(2)) {
			const dir = 2 * math.rand(2) - 1;
			const t = toothies.add(new Toothy(0, 5 * 30 * dir));
			t.pos.x = j * level.tileW;
			t.pos.y = (1 - dir) / 2 * level.h - 30 * dir * math.rand(1, 5);
		}
	}
	
	return toothies;
	
}
