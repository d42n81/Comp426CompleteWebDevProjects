import keypress from 'keypress';
import Game from "./engine/game";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */

let game = new Game(4);
let zeroBoard = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
let newBoard = [0,4,0,2, 0,16,0,2, 0,0,0,0, 0,0,0,0];
let collisionBoard = [2,2,2,2, 2,2,2,2, 2,2,2,2, 2,2,2,2];
let moveRightBoard = [0,0,0,0, 16,4,0,0, 4,0,0,0, 0,0,16,0];
let moveDownBoard = [0,0,0,2, 4,4,0,0, 0,4,4,0, 0,4,2,0];
let moveLeftBoard = [0,4,0,0, 0,0,0,2, 0,0,0,0, 4,4,0,8];
let moveUpBoard = [4,0,0,8, 16,2,0,4, 0,0,0,4, 0,0,0,0];
let moveLeftCollision = [0,0,0,4, 0,16,0,0, 0,0,0,2, 16,8,8,0];
let moveRightTest = [0,0,0,0, 0,0,0,0, 8,2,0,0, 0,0,0,0];
let moveUpTest = [0,0,0,0, 0,0,0,0, 0,0,2,0, 0,0,0,0];

let newGame = {
    board: moveUpTest,
    score: 0,
    won: false,
    over: false
}


game.loadGame(newGame);
console.log("\n\nLoaded Game");
// console.log("Collision Board: " + game.collisionBoard.toString());
game.toString();
// game.onMove({});
// game.move("right");
// game.move("down");
// game.move("up");
// game.move("up");
// game.move("up");
// game.move("up");

game.onMove(gameState => {
    console.log(game.toString());
    // console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    console.log('You lost! :(', gameState)
    console.log(`Your score was ${gameState.score}`);
});

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'right':
            game.move('right');
            break;
        case 'left':
            game.move('left');

            break;
        case 'down':
            game.move('down');

            break;
        case 'up':
            game.move('up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});

game.move("up");
game.toString();
process.stdin.setRawMode(true);
process.stdin.resume();

