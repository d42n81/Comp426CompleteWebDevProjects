
import Game from "./engine/game.js";
$( document ).ready(function() {
    $('.win').hide();
    $('.lose').hide();
    let game = new Game(4);

    // let zeroBoard = [1,2,3,4, 5,6,7,8, 9,10,11,12, 13,14,15,16];
    // let newGame = {
    //     board: zeroBoard,
    //     score: 0,
    //     won: false,
    //     over: false
    // }
    // game.loadGame(newGame)

    // Initialize Game Board:
    $('#0').html(game.gameState.board[0]);
    $('#1').html(game.gameState.board[1]);
    $('#2').html(game.gameState.board[2]);
    $('#3').html(game.gameState.board[3]);
    $('#4').html(game.gameState.board[4]);
    $('#5').html(game.gameState.board[5]);
    $('#6').html(game.gameState.board[6]);
    $('#7').html(game.gameState.board[7]);
    $('#8').html(game.gameState.board[8]);
    $('#9').html(game.gameState.board[9]);
    $('#10').html(game.gameState.board[10]);
    $('#11').html(game.gameState.board[11]);
    $('#12').html(game.gameState.board[12]);
    $('#13').html(game.gameState.board[13]);
    $('#14').html(game.gameState.board[14]);
    $('#15').html(game.gameState.board[15]);

    let onMoveFunction = () => {
        // console.log("Hello world!");
        $('#0').html(game.gameState.board[0]);
        $('#1').html(game.gameState.board[1]);
        $('#2').html(game.gameState.board[2]);
        $('#3').html(game.gameState.board[3]);
        $('#4').html(game.gameState.board[4]);
        $('#5').html(game.gameState.board[5]);
        $('#6').html(game.gameState.board[6]);
        $('#7').html(game.gameState.board[7]);
        $('#8').html(game.gameState.board[8]);
        $('#9').html(game.gameState.board[9]);
        $('#10').html(game.gameState.board[10]);
        $('#11').html(game.gameState.board[11]);
        $('#12').html(game.gameState.board[12]);
        $('#13').html(game.gameState.board[13]);
        $('#14').html(game.gameState.board[14]);
        $('#15').html(game.gameState.board[15]);
        let score = game.gameState.score;
        $('#Score').html("Score: " + score);
    }

    game.onMove(onMoveFunction);

    let onLoseFunction = () => {
        $('.Board').hide();
        $('.lose').show();
    }

    game.onLose(onLoseFunction);

    let onWinFunction = () => {
        $('.Board').hide();
        $('.win').show();
    }

    game.onWin(onWinFunction);

    $('#resetButton').click(function (event) {
        game.setupNewGame();

        $('.Board').show();

        $('.win').hide();
        $('.lose').hide();

        $('#0').html(game.gameState.board[0]);
        $('#1').html(game.gameState.board[1]);
        $('#2').html(game.gameState.board[2]);
        $('#3').html(game.gameState.board[3]);
        $('#4').html(game.gameState.board[4]);
        $('#5').html(game.gameState.board[5]);
        $('#6').html(game.gameState.board[6]);
        $('#7').html(game.gameState.board[7]);
        $('#8').html(game.gameState.board[8]);
        $('#9').html(game.gameState.board[9]);
        $('#10').html(game.gameState.board[10]);
        $('#11').html(game.gameState.board[11]);
        $('#12').html(game.gameState.board[12]);
        $('#13').html(game.gameState.board[13]);
        $('#14').html(game.gameState.board[14]);
        $('#15').html(game.gameState.board[15]);
        let score = game.gameState.score;
        $('#Score').html("Score: " + score);


    });

    $(document).keydown(function (event) {
        let code = event.which;
        // console.log("Key Pressed: " + code);
        if(code == 37 || code == 38 || code == 39 || code == 40) {
            event.preventDefault();
            let direction = "";
            if(code == 37) {
                direction = "left"
            } else if (code == 38) {
                direction = "up";
            } else if (code == 39) {
                direction = "right";
            } else if (code == 40) {
                direction = "down";
            }
            game.move(direction);
            // game.gameState.board[0] = 10;
            // game.toString();
            
            // console.log("board[0] = " + game.gameState.board[0]);
        }
        
    });
});