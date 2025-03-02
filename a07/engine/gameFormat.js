/*
Add your code for Game here
 */
export default class Game {
    constructor(widthAndHeight) {
        this.widthAndHeight = widthAndHeight;
        this.gameState = {
            board: [widthAndHeight * widthAndHeight],
            score: 0,
            won: false,
            over: false // True if the board is in a state such that no more moves can be made
        };
        this.collisionBoard = [widthAndHeight * widthAndHeight].fill(0);
        // Initialize Board:
        for (let i = 0; i < widthAndHeight * widthAndHeight; i++) {
            this.gameState.board[i] = 0;
        }
        this.onMoveCallbacks = [];
        this.onLoseCallbacks = [];
        this.onWinCallbacks = [];
        // generate initial tiles in random locations:
        this.generateNewTiles(2);
    }
    
    // Helper Methods:
    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateNewTiles(tilesToGenerate) {
        for (let i = 0; i < tilesToGenerate; i++) {
            // add generate info here.
            // add some logic here to add a 2 in some random locations on the board.
            let twoOrFourTileToAdd = this.randomIntFromInterval(1, 10);
            if (twoOrFourTileToAdd == 10) {
                twoOrFourTileToAdd = 4;
            } else {
                twoOrFourTileToAdd = 2;
            }
            // handle determining a random free position.
            let tileToAddPosition = -1;

            while (true) {
                // check if free
                tileToAddPosition = this.randomIntFromInterval(0, this.widthAndHeight * this.widthAndHeight - 1);
                if (this.gameState.board[tileToAddPosition] == 0) {
                    // position is free. Add a new tile there. 
                    break;
                } else {
                    continue;
                }
            }


            // add tile at position:
            this.gameState.board[tileToAddPosition] = twoOrFourTileToAdd;
        }

    }

    move(directionString) {
        console.log("Called 'move() with: " + directionString);
        if (directionString === "left") {
            this.moveKey(37);
        } else if (directionString === "up") {
            this.moveKey(38)
        } else if (directionString === "right") {
            this.moveKey(39)
        } else if (directionString === "down") {
            this.moveKey(40)
        } else {
            return;
        }
    }

    moveKey(keyboardCode) {
        // define keyboard codes to directions:
        let leftArrow = 37;
        let upArrow = 38;
        let rightArrow = 39;
        let downArrow = 40;

        //define Board:
        let board = this.gameState.board;

        // clear collision board;
        this.collisionBoard.fill(0);

        // if keyboardCode != arrow keys, do nothing
        if (keyboardCode != leftArrow || keyboardCode != upArrow || keyboardCode != rightArrow || keyboardCode != downArrow) {
            // do nothiing

        }

        if (this.gameState.over == true) {
            // do nothing.
            return;
        }

        if (keyboardCode == leftArrow) {
            this.moveLeft();

        }
        if (keyboardCode == rightArrow) {
            this.moveRight();

        }
        if (keyboardCode == upArrow) {
            this.moveUp();

        }
        if (keyboardCode == downArrow) {
            this.moveDown();

        }

        // call on Move Methods:
        for (let i = 0; i < this.onMoveCallbacks.length; i++) {
            this.onMoveCallbacks[i](this.gameState);
        }
        this.generateNewTiles(1);

    }

    leftArrowMovement() {
        // logic:
        // check for matching numbers to the left of all arrows.
        // move left through all 0s until hit a number that is not 0. 
        // start by moving leftmost (directionmost) number;

        // Should I handle losing inside of each move function? Count how many rows couldn't move. If couldNotMove == rows then you lose?
        let moved = false;
        for (let row = 0; row < this.widthAndHeight; row++) {
            // for each row:
            let collision = false;
            for (let column = 0; column < this.widthAndHeight; column++) {
                // move each item in [row][column] to the left. Starting with leftmost.
                // If collisions (same number hits same number) occur, double value. Increase score. 


                // since we are moving to the left. Column 0 doesn't matter. 
                let indexWeAreLookingAt = this.gameState.widthAndHeight * row + column;
                let boardCell = board[indexWeAreLookingAt];
                let valueToSwap;
                // iterate over all the columns in each row to see where we will put each cell. 
                for (let j = 0; j < column; j++) {
                    let previousValueToCompare = board[indexWeAreLookingAt - (j + 1)];
                    if (previousValueToCompare == 0) {
                        // move item to this location. Place 0 where the old location was. 
                        if (boardCell == 0) {
                            // do nothing. Continue. Can't combine 0.
                            continue;
                        } else {
                            // move item to this location. Place 0 where the old location was. 
                            // swap.
                            moved = true;
                            valueToSwap = boardCell;
                            boardCell = previousValueToCompare;
                            previousValueToCompare = valueToSwap;
                            continue;
                        }
                    } else {
                        // location has a value not 0. Check if boardCell and valueToCompare are the same value
                        if (boardCell == previousValueToCompare) {
                            // combine and add to score.
                            if (collision == false) {
                                // we haven't had a collision yet, so we can collide:
                                // THIS COLLISION LOGIC IS INCORRECT. TILES CAN COMBINE MULTIPLE TIMES IN A ROW, BUT TILES CANNOT COMBINE MULTIPLE TIMES.
                                // ONCE A TILE HAS COMBINED, IT CAN NO LONGER BE COMBINED WITH. 
                                moved = true;
                                valueToSwap = boardCell + previousValueToCompare;
                                boardCell = 0;
                                previousValueToCompare = valueToSwap;
                                // add to score:
                                this.gameState.score += valueToSwap;
                                collision = true;
                                if (valueToSwap == 2048) {
                                    // You WIN!!!!
                                    this.gameState.won = true;
                                }
                            } else {
                                // we have already had a collision. continue;
                                continue;
                            }
                        }
                    }
                }

            }
        }

        // checkIfLost();
        if (moved == false) {
            // YOU LOST
            this.gameState.over = true;
        }

    }

    moveLeft() {
        // moving to the left. Remember the forumla for the current index is: widthAndHeight * rowNumber + offsetColumnValue
        let continueCounter = 2 * widthAndHeight;
        let globalMove = false;
        let localMove = false;
        console.log("Beginning moveLeft()");

        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                let previousCell;


                // now we know the cell we are looking at. 

                // let's declare some moveLeft cases, starting with the simplest one:

                // we are the leftmost cell in the row.
                if (columnNumber == 0) {
                    continue;
                } else {
                    previousCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber - 1];
                }

                // we are a 0.
                if (currentCell == 0) {
                    // we don't need to move this cell.
                    continue;
                }

                // we need to move left through one or more values.
                if (currentCell != 0) {
                    // move left.

                    // we need to move through one or more 0s.
                    if (previousCell == 0) {
                        // non zero value moves left. currentcell = 0;
                        previousCell = currentCell;
                        currentCell = 0;
                        // globalMove = true;
                        // localMove = true;
                        // reset columnNumber. Check value again.
                        columnNumber = 0;
                        // continueCounter--;
                        continue;
                    } else {
                        // previousCell != 0;

                        // if previousCell != currentCell, no move occurs.
                        if (previousCell != currentCell) {
                            // there values are different. Can't combine them. Continue;
                            continue;
                        }

                        // if previousCell == currentCell AND collisonBoard @ previous position != 0, combine, we create a 0 at newly freed space.
                        // reset column number to 0?
                        // set collisionBoard at index.
                        if (previousCell == currentCell) {
                            // we have a collision. 
                            // make sure there hasn't been a collision before.
                            if (this.collisionBoard[(this.widthAndHeight) * rowNumber + columnNumber - 1] == 0) {
                                previousCell += currentCell;
                                currentCell = 0;
                                if (previousCell == 2048) {
                                    // You won!!!
                                    this.gameState.won = true;
                                }
                                this.gameState.score += previousCell;
                                columnNumber = 0; // because we have to reiterate through the columns now that there is an extra 0;    
                                // Now we need to updata collision board
                                this.collisionBoard[(this.widthAndHeight) * rowNumber + columnNumber - 1] = 1;
                            } else {
                                // we have already had a collision at this location. Can't collide again.
                                continue;
                            }

                        }
                    }


                }
            }
        }

        // end of loops.
        // check if lost. 
        // check if lost. 
        if (this.checkIfLost()) {
            for (let i = 0; i < this.onLoseCallbacks.length; i++) {
                this.onLoseCallbacks[i](this.gameState);
            }
        }
        // check if won
        if (this.checkIfWon()) {
            for (let i = 0; i < this.onWinCallbacks.length; i++) {
                this.onWinCallbacks[i](this.gameState);
            }
        }
        console.log("Ending moveLeft()");

    }

    moveRight() {
        console.log("Beginning moveRight()");
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                let nextCell;

                // cases:

                // we are the rightmost cell in the row.
                if (columnNumber == this.widthAndHeight - 1) {
                    continue;
                } else {
                    nextCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber + 1];
                }

                // we are a 0.
                if (currentCell == 0) {
                    // we don't need to move this cell.
                    continue;
                }

                // we need to move right through one or more values.
                if (currentCell != 0) {
                    // move right.

                    // we need to move through one or more 0s.
                    if (nextCell == 0) {
                        // non zero value moves right. currentcell = 0;
                        nextCell = currentCell;
                        currentCell = 0;
                        // globalMove = true;
                        // localMove = true;
                        // reset columnNumber. Check value again.
                        columnNumber = 0;
                        // continueCounter--;
                        continue;
                    } else {
                        // next Cell is non zero. Check if not equal to current cell.
                        // if equal, combine.
                        if (nextCell != currentCell) {
                            // can't combine. Continue;
                            continue;
                        } else {
                            // nextCell and CurrentCell are equal. Combine.
                            // we have a collision. 
                            // make sure there hasn't been a collision before.
                            if (this.collisionBoard[(this.widthAndHeight) * rowNumber + columnNumber + 1] == 0) {
                                nextCell += currentCell;
                                currentCell = 0;
                                if (nextCell == 2048) {
                                    // You won!!!
                                    this.gameState.won = true;
                                }
                                this.gameState.score += nextCell;
                                columnNumber = 0; // because we have to reiterate through the columns now that there is an extra 0;    
                                // Now we need to updata collision board
                                this.collisionBoard[(this.widthAndHeight) * rowNumber + columnNumber + 1] = 1;
                            } else {
                                // we have already had a collision at this location. Can't collide again.
                                continue;
                            }
                        }
                    }
                }
            }
        }
        // end of loops
        // check if lost. 
        if (this.checkIfLost()) {
            for (let i = 0; i < this.onLoseCallbacks.length; i++) {
                this.onLoseCallbacks[i](this.gameState);
            }
        }
        // check if won
        if (this.checkIfWon()) {
            for (let i = 0; i < this.onWinCallbacks.length; i++) {
                this.onWinCallbacks[i](this.gameState);
            }
        }
        console.log("Ending moveRight()");

    }

    moveUp() {
        // handles the logic for moving up. 
        // First, iterate through all the cells:
        console.log("Beginning moveUp()");
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                let previousCell;

                // Cases:

                // we are in the topmost column
                let difference = ((this.widthAndHeight) * rowNumber + columnNumber) - this.widthAndHeight;
                if (difference < 0) {
                    // in topmost column. Can't do anything
                    continue;
                } else {
                    previousCell = this.gameState.board[difference];
                }

                if (currentCell == 0) {
                    // don't need to swap.
                    continue;
                }

                if (currentCell != 0) {
                    // move up.

                    // we need to move through one or more 0s.
                    if (previousCell == 0) {
                        // non zero value moves up. currentcell = 0;
                        previousCell = currentCell;
                        currentCell = 0;
                        // globalMove = true;
                        // localMove = true;
                        // reset columnNumber. Check value again.
                        columnNumber = 0;
                        // continueCounter--;
                        continue;
                    } else {
                        // previousCell != 0;

                        // if previousCell != currentCell, no move occurs.
                        if (previousCell != currentCell) {
                            // there values are different. Can't combine them. Continue;
                            continue;
                        }

                        // if previousCell == currentCell AND collisonBoard @ previous position != 0, combine, we create a 0 at newly freed space.
                        // reset column number to 0?
                        // set collisionBoard at index.
                        if (previousCell == currentCell) {
                            // we have a collision. 
                            // make sure there hasn't been a collision before.
                            if (this.collisionBoard[difference] == 0) {
                                previousCell += currentCell;
                                currentCell = 0;
                                if (previousCell == 2048) {
                                    // You won!!!
                                    this.gameState.won = true;
                                }
                                this.gameState.score += previousCell;
                                columnNumber = 0; // because we have to reiterate through the columns now that there is an extra 0;    
                                // Now we need to updata collision board
                                this.collisionBoard[difference] = 1;
                            } else {
                                // we have already had a collision at this location. Can't collide again.
                                continue;
                            }
                        }
                    }
                }
            }
        }
        // END of Loops
        // check if lost. 
        if (this.checkIfLost()) {
            for (let i = 0; i < this.onLoseCallbacks.length; i++) {
                this.onLoseCallbacks[i](this.gameState);
            }
        }
        // check if won
        if (this.checkIfWon()) {
            for (let i = 0; i < this.onWinCallbacks.length; i++) {
                this.onWinCallbacks[i](this.gameState);
            }
        }
        console.log("Ending moveUp()");
    }

    moveDown() {
        console.log("Beginning moveDown()");
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                let nextCell;

                // cases:

                // we are the bottommost cell in the row.
                let nextIndex = (this.widthAndHeight) * rowNumber + columnNumber + this.widthAndHeight;
                if (nextIndex > this.widthAndHeight * this.widthAndHeight - 1) {
                    // nextRow would be greater than the size.
                    continue;
                } else {
                    nextCell = this.gameState.board[nextIndex];
                }

                // we are a 0.
                if (currentCell == 0) {
                    // we don't need to move this cell.
                    continue;
                }

                // we need to move down through one or more values.
                if (currentCell != 0) {
                    // move down.

                    // we need to move through one or more 0s.
                    if (nextCell == 0) {
                        // non zero value moves right. currentcell = 0;
                        nextCell = currentCell;
                        currentCell = 0;
                        // globalMove = true;
                        // localMove = true;
                        // reset columnNumber. Check value again.
                        columnNumber = 0;
                        // continueCounter--;
                        continue;
                    } else {
                        // next Cell is non zero. Check if not equal to current cell.
                        // if equal, combine.
                        if (nextCell != currentCell) {
                            // can't combine. Continue;
                            continue;
                        } else {
                            // nextCell and CurrentCell are equal. Combine.
                            // we have a collision. 
                            // make sure there hasn't been a collision before.
                            if (this.collisionBoard[nextIndex] == 0) {
                                nextCell += currentCell;
                                currentCell = 0;
                                if (nextCell == 2048) {
                                    // You won!!!
                                    this.gameState.won = true;
                                }
                                this.gameState.score += nextCell;
                                columnNumber = 0; // because we have to reiterate through the columns now that there is an extra 0;    
                                // Now we need to updata collision board
                                this.collisionBoard[nextIndex] = 1;
                            } else {
                                // we have already had a collision at this location. Can't collide again.
                                continue;
                            }
                        }
                    }
                }
            }
        }
        // end of loops
        // check if lost. 
        if (this.checkIfLost()) {
            for (let i = 0; i < this.onLoseCallbacks.length; i++) {
                this.onLoseCallbacks[i](this.gameState);
            }
        }
        // check if won
        if (this.checkIfWon()) {
            for (let i = 0; i < this.onWinCallbacks.length; i++) {
                this.onWinCallbacks[i](this.gameState);
            }
        }
        console.log("Ending moveDown()");
    }

    checkIfLost() {
        // first, check if full.
        for (let i = 0; i < this.gameState.board.length; i++) {
            if (this.gameState.board[i] == 0) {
                return false; // we are not full.
            }
        }
        // if we make it here, we are full. 
        // Now we need to check if there are any moves available. 
        // Since we are full, the only available moves would be to combine tiles.
        // loop through the game board 4 times. Don't change anything Check if there are any combinations for any direction.
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                // check if any matching values surrounding the cell.
                let leftValue;
                let rightValue;
                let upValue;
                let downValue;

                // leftValue test:
                if (columnNumber == 0) {
                    leftValue = -1;
                } else {
                    leftValue = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber - 1];
                    if (currentCell == leftValue) {
                        return false;
                    }
                }

                // rightValue test
                // we are the rightmost cell in the row.
                if (columnNumber == this.widthAndHeight - 1) {
                    rightValue = -1;
                } else {
                    rightValue = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber + 1];
                    if (currentCell == rightValue) {
                        return false;
                    }
                }

                // upValue test
                // we are in the topmost column
                let difference = ((this.widthAndHeight) * rowNumber + columnNumber) - this.widthAndHeight;
                if (difference < 0) {
                    // in topmost column. Can't do anything
                    upValue = -1;
                } else {
                    upValue = this.gameState.board[difference];
                    if (currentCell == upValue) {
                        return false;
                    }
                }

                // down value test
                // we are the bottommost cell in the row.
                let nextIndex = (this.widthAndHeight) * rowNumber + columnNumber + this.widthAndHeight;
                if (nextIndex > this.widthAndHeight * this.widthAndHeight - 1) {
                    // nextRow would be greater than the size.
                    downValue = -1;
                } else {
                    downValue = this.gameState.board[nextIndex];
                    if (currentCell == downValue) {
                        return false;
                    }
                }

            }
        }
        // END of Loops
        this.gameState.over = true;
        return true;
    }

    checkIfWon() {
        if (this.gameState.won == true) {
            // YOU WON!!!
            // Do Something!
            this.gameState.over = true;
            return true;
        }
        
    }

    setupNewGame() {
        // resets the game
        let widthAndHeight = this.widthAndHeight;
        console.log("In setupNewGame. widthAndHeight is: " + widthAndHeight);
        let newGameState = {
            board: [widthAndHeight * widthAndHeight], // One dimensional array representing the board. Formula for location on the board is = widthAndHeight*desiredRowNumber+desiredColumnNumber;
            score: 0, // The score of the game at the current instant in time. Initially, the score should be set to zero. Every time the player makes a move that combines two tiles, the combined value should be added to the score (e.g. if two 128 tiles are merged to make a 256 tile, then you add 256 to the score).
            won: false, //True if a user has combined two 1024 tiles to make a 2048 tile
            over: false // True if the board is in a state such that no more moves can be made

        };
        this.gameState = newGameState;
        this.collisionBoard = [widthAndHeight * widthAndHeight].fill(0);
        this.gameState.board = [].fill(0);
        this.generateNewTiles(2);
    }

    loadGame(gS) {
        this.gameState = gS;
    }

    toString() {
        console.log("Printing Gameboard (starting from 0): ");
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                console.log("" + currentCell + ",");
            }

        }

    }

    onMove(callback) {
        this.onMoveCallbacks.push(callback);
    }

    onWin(callback) {
        this.onWinCallbacks.push(callback);
    }

    onLose(callback) {
        this.onLoseCallbacks.push(callback);
    }

    getGameState() {
        return this.gameState;
    }

    
}

