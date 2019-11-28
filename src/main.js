
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Game, KeyControls} = mlopez13;

// Screens.
import LogoScreen from "../screens/LogoScreen.js";
import TitleScreen from "../screens/TitleScreen.js";
import GameScreen from "../screens/GameScreen.js";
import GameOverScreen from "../screens/GameOverScreen.js";

// GAME SETUP.
const game = new Game(630, 480);
const controls = new KeyControls();

// FIRST SCREEN.
game.scene = new LogoScreen(game, titleScreen);

// GAME LOOP.
game.run();



// --------
// --------
// --------
// FUNCTIONS.

function titleScreen() {
	game.scene = new TitleScreen(game, controls, newGame);
}

function newGame() {
	game.scene = new GameScreen(game, controls, gameOverScreen);
}

function gameOverScreen(result) {
	game.scene = new GameOverScreen(game, controls, result, titleScreen);
}
