
// Library import.
import mlopez13 from "../mlopez13/index.js";
const {Game, KeyControls} = mlopez13;

import LogoScreen from "../screens/LogoScreen.js";
import TitleScreen from "../screens/TitleScreen.js";
import GameScreen from "../screens/GameScreen.js";
import GameOverScreen from "../screens/GameOverScreen.js";

// GAME SETUP.
const game = new Game(630, 480);
const controls = new KeyControls();

// FUNCTIONS.

function titleScreen() {
	game.scene = new TitleScreen(game, controls, newGame);
}

function gameOverScreen(result) {
	game.scene = new GameOverScreen(game, controls, result, titleScreen);
}

function newGame() {
	game.scene = new GameScreen(game, controls, gameOverScreen);
}

// FIRST SCREEN.
game.scene = new LogoScreen(game, titleScreen);
//~ game.scene = new TitleScreen(game, controls, newGame);
//~ game.scene = new GameScreen(game, controls, gameOverScreen);

// GAME LOOP.
game.run();







// WHAT TO DO MORE:

// GAME SCREEN. Score, life.

// LEVEL DESIGN. Make easier stuff.

// SPEED. What about slimey moving from tile to tile with keyboards?
// It could be a puzzle game instead of an arcade...

// GAME OVER.















