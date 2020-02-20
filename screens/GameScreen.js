
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Container, entity, Level, math, Rectangle, Text, Texture, TileSprite} = mlopez13;

// Entities.
import Slimey from "../entities/Slimey.js";
import Toothy from "../entities/Toothy.js";
import Fruit from "../entities/Fruit.js";

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, SAND_Y, FRUIT_Y, SLIMEY_Y, FRUIT_TYPE, FRUIT_PROB, TOOTHY_PROB, MAX_LIFE} from "../constants/index.js";

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
		
		// FRUIT.
		const fruit = addFruit(level);
		this.add(fruit);
		
		// SLIMEY.
		const slimey = this.add(new Slimey(controls));
		
		// Stats.
		this.stats = {
			sand: 0,
			maxSand: level.initialSand,
			life: MAX_LIFE
		};
		
		// SCORE.
		const scoreText = this.add(new Text("SAND: 0/" + this.stats.maxSand,
			{font: "bold 20pt georgia", fill: "white", align: "left"}
		));
		scoreText.pos = {x: w - 6 * TILE_W, y: h - 3 / 2 * TILE_H};
		this.scoreText = scoreText;
		
		// LIFE.
		const lifeText = this.add(new Text("LIFE:",
			{font: "bold 20pt georgia", fill: "white", align: "left"}
		));
		lifeText.pos = {x: TILE_W / 2, y: h - 3 / 2 * TILE_H};
		
		const life = new Container();
		for (let i = 0; i < this.stats.life; i++) {
			const s = life.add(new TileSprite(texture, TILE_W, TILE_H));
			s.frame.y = SLIMEY_Y;
			s.pos = {x: TILE_W / 2 + 90 + 1.25 * TILE_W * i, y: h - 1.6 * TILE_H};
		}
		this.add(life);
		
		// STATUS.
		const status = this.add(new Container());
		status.pos = {x: w / 2 - 3 * TILE_W, y: h - 3 / 2 * TILE_H};
		status.visible = false;
		
		const statusText = status.add(new Text("",
			{font: "bold 10pt georgia", fill: "white", align: "left"}
		));
		const statusBar = status.add(new Rectangle(3 * TILE_W, 10, "white"));
		//statusBar.pos.x = 10 + 10 * statusText.text.length;
		statusBar.pos.x = 0;
		statusBar.pos.y = 15;
		
		// ENEMIES.
		const toothies = addToothies(level);
		this.add(toothies);
		
		// Keep references.
		this.game = game;
		this.level = level;
		this.fruit = fruit;
		this.slimey = slimey;
		this.toothies = toothies;
		
		this.life = life;
		
		this.status = status;
		this.statusText = statusText;
		this.statusBar = statusBar;
		
		this.gameOverFlag = false;
		this.gameOverLife = 3;
		this.nextScreen = nextScreen;
		
	}
	
	update(dt, t) {
		
		// Container update.
		super.update(dt, t);
		
		const {game, level, fruit, slimey, toothies, stats, life, statusText, statusBar} = this;
		const {w, h} = game;
		const {pos, dir, anims} = slimey;
		const {bounds: {left, right, top, bottom}} = level;
		
		// Confine SLIMEY into bounds.
		pos.x = math.clamp(pos.x, left, right);
		pos.y = math.clamp(pos.y, top, bottom);
		
		if (!this.gameOverFlag) {
					
			// Ground.
			const ground = level.checkGround(entity.center(slimey));
			if (ground === "sand becomes space") {
				stats.sand++;
				this.scoreText.text = "SAND: " + stats.sand + "/" + stats.maxSand;
				if (stats.sand == stats.maxSand) {
					// CONGRATULATIONS!
					this.gameOverFlag = true;
				}
			}
			
			// Fruit.
			fruit.map(f => {
				const {pos} = f;
				if (entity.distance(slimey, f) < 30) {
					switch (f.type) {
						case "APPLE":
							slimey.invincible = 6;
							break;
						case "ORANGE":
							slimey.speed = 0.1;
							break;
						case "PEAR":
							if (stats.life < MAX_LIFE) {
								const s = life.add(new TileSprite(texture, TILE_W, TILE_H));
								s.frame.y = SLIMEY_Y;
								s.pos = {x: TILE_W / 2 + 90 + 1.25 * TILE_W * stats.life, y: h - 1.6 * TILE_H};
								stats.life++;
							}
							break;
						case "BANANA":
							slimey.speed = 0.3;
					}
					f.dead = true;
				}
			});
			
			// Toothies.
			toothies.map(t => {
				
				const {pos, xSpeed, ySpeed} = t;
				
				if (entity.distance(slimey, t) < TILE_W && slimey.invincible <= 0) {
					
					// Slimey got hit!
					stats.life--;
					
					if (stats.life == 0) {
						// GAME OVER, man.
						this.gameOverFlag = true;
					} else {
						life.children = [];
						for (let i = 0; i < this.stats.life; i++) {
							const s = life.add(new TileSprite(texture, TILE_W, TILE_H));
							s.frame.y = SLIMEY_Y;
							s.pos = {x: TILE_W / 2 + 90 + 1.25 * TILE_W * i, y: h - 1.6 * TILE_H};
						}
						
						slimey.invincible = 3;
					}
				}
				
				// Screen wrap.
				if (pos.x > level.w && xSpeed > 0) {
					pos.x = -TILE_W;
				}
				if (pos.y > level.h && ySpeed > 0) {
					pos.y = -TILE_H;
				}
				if (pos.x < -TILE_W && xSpeed < 0) {
					pos.x = level.w;
				}
				if (pos.y < -TILE_H && ySpeed < 0) {
					pos.y = level.h;
				}
				
			});
			
			// Status.
			if (slimey.invincible > 0) {
				this.status.visible = true;
				statusText.text = "INVINCIBLE";
				statusBar.w = slimey.invincible * TILE_W;
			} else {
				this.status.visible = false;
			}
			
		} else {
			
			toothies.map(t => {t.xSpeed = 0; t.ySpeed = 0;});
			
			slimey.dir = {x: 0, y: 0};
			slimey.controls = null;
			
			if (this.gameOverLife > 0) {
				this.gameOverLife -= dt;
			} else {
				this.nextScreen(stats);
			}
			
		}
	
		// Animation.
		if (((pos.x == left || pos.x == right) && dir.y == 0 || (pos.y == top || pos.y == bottom) && dir.x == 0) &&
			!this.gameOverFlag) {
			anims.play("blink");
		} else {
			anims.play("roll");
		}
		
	}
}

export default GameScreen;



// --------
// --------
// --------
// FUNCTIONS

function addToothies(level) {
	
	const toothies = new Container();
	
	for (let i = 3; i < level.mapH - 3; i++) {
		if (math.randOneIn(TOOTHY_PROB)) {
			const dir = 2 * math.rand(2) - 1;
			const t = toothies.add(new Toothy(5 * TILE_W * dir, 0));
			t.pos.x = (1 - dir) / 2 * level.w - TILE_W * dir * math.rand(1, 5);
			t.pos.y = i * level.tileH;
		}
	}
	
	for (let j = 3; j < level.mapW - 1; j++) {
		if (math.randOneIn(TOOTHY_PROB)) {
			const dir = 2 * math.rand(2) - 1;
			const t = toothies.add(new Toothy(0, 5 * TILE_H * dir));
			t.pos.x = j * level.tileW;
			t.pos.y = (1 - dir) / 2 * level.h - TILE_H * dir * math.rand(1, 5);
		}
	}
	
	return toothies;
	
}

function addFruit(level) {
	
	const fruit = new Container();
	
	for (let i = 1; i < level.mapH - 3; i++) {
		for (let j = 1; j < level.mapW - 1; j++) {
			if (math.randOneIn(FRUIT_PROB) && (i > 3 || j > 2) && level.tileAtMapPos({x: j, y: i}).frame.y != SAND_Y) {
				const f = fruit.add(new Fruit(math.randOneFrom(FRUIT_TYPE)));
				f.pos = {x: TILE_W * j, y: TILE_H * i};
			}
		}
	}
	
	return fruit;
	
}
