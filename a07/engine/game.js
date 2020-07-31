

/*
Add your code for Game here
 */
// ass changes to the value of board must address this.gameState.board[index]; Not a variable that was equal to the value of this array.
export default class Game {
    constructor(widthAndHeight) {
        this.widthAndHeight = widthAndHeight;
        this.gameState = {
            board: [widthAndHeight * widthAndHeight],
            score: 0,
            won: false,
            over: false // True if the board is in a state such that no more moves can be made
        };
        this.collisionBoard = [widthAndHeight * widthAndHeight];
        // Initialize Board:
        for (let i = 0; i < widthAndHeight * widthAndHeight; i++) {
            this.gameState.board[i] = 0;
            this.collisionBoard[i] = 0;
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
        // console.log("In generateNewTiles");
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
            // console.log("!!!About to log tileToAddPosition in generateNewTiles:");
            // console.log("Current board: " + this.toString());
            
            while (true) {
                // check if free
                // Here is where infinite loop is!!!
                tileToAddPosition = this.randomIntFromInterval(0, this.widthAndHeight * this.widthAndHeight - 1);
                // console.log("Tile to Add Position is: " + tileToAddPosition);
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
        // console.log("Called 'move() with: " + directionString);
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
        for(let i = 0; i < this.collisionBoard.length; i++) {
            this.collisionBoard[i] = 0;
        }

        // if keyboardCode != arrow keys, do nothing
        if (keyboardCode != leftArrow || keyboardCode != upArrow || keyboardCode != rightArrow || keyboardCode != downArrow) {
            // do nothiing

        }

        if (this.gameState.over == true) {
            // do nothing.
            return;
        }

        if (keyboardCode == leftArrow) {
            // if(this.checkIfLeft()) {
            //     this.moveLeft();
            // } else {
            //     return;
            // }
            if(!this.moveLeft()) {
                return;
            }
            

        }
        if (keyboardCode == rightArrow) {
            // if(this.checkIfRight()){
            //     this.moveRight();
            // } else {
            //     return;
            // }
            if(!this.moveRight()) {
                return;
            }

        }
        if (keyboardCode == upArrow) {
            // if(this.checkIfUp()){
            //     this.moveUp();
            // } else {
            //     return;
            // }
            if(!this.moveUp()) {
                return;
            }

        }
        if (keyboardCode == downArrow) {
            // if(this.checkIfDown()){
            //     this.moveDown();
            // } else {
            //     return;
            // }
            if(!this.moveDown()) {
                return;
            }

        }

        this.generateNewTiles(1);
        // call on Move Methods:
        for (let i = 0; i < this.onMoveCallbacks.length; i++) {
            this.onMoveCallbacks[i](this.gameState);
        }
        

        if (this.checkIfLost()) {
            for (let i = 0; i < this.onLoseCallbacks.length; i++) {
                this.onLoseCallbacks[i](this.gameState);
            }
        }

    }

    moveLeft() {
        // moving to the left. Remember the forumla for the current index is: widthAndHeight * rowNumber + offsetColumnValue
        
        // console.log("Beginning moveLeft()");
        let moved = false;
        

        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                let previousCell;
                // console.log("CollisionBoard [10] = " + this.collisionBoard[10]);


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
    
                        this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber - 1] = currentCell;
                        this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber ] = 0;
                        // globalMove = true;
                        // localMove = true;
                        // reset columnNumber. Check value again.
                        // console.log("Reset columnNumber because previousCell = 0; !!!");
                        moved = true;
                        columnNumber = -1;
                        // continueCounter--;
                        // console.log("Loop! Printing GameBoard: ")
                        // this.toString();
                        
                        
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
                            // console.log("Potential Collision. Index of collision we are looking at is: " + ((this.widthAndHeight) * rowNumber + columnNumber - 1));
                            if (this.collisionBoard[(this.widthAndHeight) * rowNumber + columnNumber - 1] === 0) {
                                previousCell += currentCell;
                                this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber - 1] += currentCell;
                                currentCell = 0;
                                this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber] = 0;
                                if (previousCell == 2048) {
                                    // You won!!!
                                    this.gameState.won = true;
                                }
                                this.gameState.score += previousCell;
                                // Now we need to updata collision board
                                // console.log("Reset columnNumber because we collided!!!");
                                // console.log("\nCollision Occured At Index: " + ((this.widthAndHeight) * rowNumber + columnNumber - 1) + "\n");
                                for(let columnCopy = columnNumber; columnCopy >= 0; columnCopy--) {
                                    let differenceCopy = (this.widthAndHeight) * rowNumber + columnCopy - 1;
                                    this.collisionBoard[differenceCopy] = 1;
                                }
                                // this.collisionBoard[(this.widthAndHeight) * rowNumber + columnNumber - 1] = 1;
                                
                                moved = true;
                                columnNumber = -1;// because we have to reiterate through the columns now that there is an extra 0;    

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
        // console.log("Ending moveLeft()");
        return moved;

    }

    moveRight() {
        let moved = false;
        // console.log("Beginning moveRight()");
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = this.widthAndHeight - 1; columnNumber >= 0 ; columnNumber--) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                let nextCell;
                // console.log("\nNew Iteration. Row Number = " + rowNumber + " And Column Number = " + columnNumber);
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
                    // console.log("\nCurrent Cell Value: " + currentCell + " || Current Cell index: " + ((this.widthAndHeight) * rowNumber + columnNumber));
                    // console.log("\nNext Cell Value: " + nextCell + " || Next Cell Index: " + ((this.widthAndHeight) * rowNumber + columnNumber + 1));

                    // we need to move through one or more 0s.
                    if (nextCell == 0) {
                        // non zero value moves right. currentcell = 0;
                        nextCell = currentCell;
                        this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber + 1] = nextCell;
                        currentCell = 0;
                        this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber] = currentCell;
                        // globalMove = true;
                        // localMove = true;
                        // reset columnNumber. Check value again.
                        columnNumber = this.widthAndHeight;
                        moved = true;
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
                                this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber + 1] += currentCell;
                                currentCell = 0;
                                this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber] = currentCell;
                                if (nextCell == 2048) {
                                    // You won!!!
                                    this.gameState.won = true;
                                }
                                this.gameState.score += nextCell;
                                // Now we need to updata collision board
                                for(let columnCopy = columnNumber; columnCopy < this.widthAndHeight; columnCopy++) {
                                    let differenceCopy = ((this.widthAndHeight) * rowNumber + columnCopy + 1);
                                    
                                    this.collisionBoard[differenceCopy] = 1;
                                }
                                moved = true;
                                // this.collisionBoard[(this.widthAndHeight) * rowNumber + columnNumber + 1] = 1;
                                columnNumber = this.widthAndHeight; // because we have to reiterate through the columns now that there is an extra 0;    

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
        // console.log("Ending moveRight()");

        return moved;

    }

    moveUp() {
        let moved = false;
        // handles the logic for moving up. 
        // First, iterate through all the cells:
        // console.log("Beginning moveUp()");
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                let previousCell;
                let previousPreviousCell;
                

                // Cases:

                // we are in the topmost column
                let difference = ((this.widthAndHeight) * rowNumber + columnNumber) - this.widthAndHeight;
                // let previousPreviousIndex = difference - this.widthAndHeight;
                // console.log("Value of difference: " + difference);
                if (difference < 0) {
                    // in topmost column. Can't do anything
                    // console.log("difference is less than 0!");
                    continue;
                } else {
                    previousCell = this.gameState.board[difference];
                    // if(previousPreviousIndex >= 0) {
                    //     previousPreviousCell = this.gameState.board[previousPreviousIndex];
                    // }

                    
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
                        this.gameState.board[difference] = previousCell;
                        currentCell = 0;
                        this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber] = 0;
                        // globalMove = true;
                        // localMove = true;
                        // reset rowNumber. Check value again.
                        rowNumber = -1;
                        columnNumber = -1;
                        moved = true;
                        // continueCounter--;
                        break;
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
                            // console.log("We have a potential collision at index: " + difference);
                            if (this.collisionBoard[difference] == 0) {
                                previousCell += currentCell;
                                this.gameState.board[difference] = previousCell;
                                currentCell = 0;
                                this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber] = currentCell;
                                if (previousCell == 2048) {
                                    // You won!!!
                                    this.gameState.won = true;
                                }
                                this.gameState.score += previousCell;
                                
                                // Now we need to updata collision board
                                for(let rowCopy = rowNumber; rowCopy >= 0; rowCopy--) {
                                    let differenceCopy = ((this.widthAndHeight) * rowCopy + columnNumber) - this.widthAndHeight;
                                    this.collisionBoard[differenceCopy] = 1;
                                }
                                // this.collisionBoard[difference] = 1;
                                rowNumber = -1; // because we have to reiterate through the columns now that there is an extra 0;    
                                columnNumber = -1;
                                moved = true;
                                break;
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
        // console.log("Ending moveUp()");
        return moved;
    }

    moveDown() {
        let moved = false;
        // console.log("Beginning moveDown()");
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                let realRowNumber = (this.widthAndHeight - 1 -rowNumber);
                let realColumnNumber = (this.widthAndHeight- 1 - columnNumber);
                // console.log("real Row number = " + realRowNumber);
                // console.log("real Column number = " + realColumnNumber);

                let currentCell = this.gameState.board[(this.widthAndHeight) * realRowNumber + realColumnNumber];
                let nextCell;
                

                // cases:

                // we are the bottommost cell in the row.
                let nextIndex = (this.widthAndHeight) * realRowNumber + realColumnNumber + this.widthAndHeight;
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
                        this.gameState.board[nextIndex] = nextCell;
                        currentCell = 0;
                        this.gameState.board[(this.widthAndHeight) * realRowNumber + realColumnNumber] = currentCell;
                        // globalMove = true;
                        // localMove = true;
                        // reset columnNumber. Check value again.
                        rowNumber = -1;
                        columnNumber = -1;
                        moved = true;
                        // continueCounter--;
                        break;
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
                                this.gameState.board[nextIndex] = nextCell;
                                currentCell = 0;
                                this.gameState.board[(this.widthAndHeight) * realRowNumber + realColumnNumber] = currentCell;
                                if (nextCell == 2048) {
                                    // You won!!!
                                    this.gameState.won = true;
                                }
                                this.gameState.score += nextCell;
                                
                                // Now we need to updata collision board
                                for(let rowCopy = realRowNumber; rowCopy < this.widthAndHeight; rowCopy++) {
                                    let differenceCopy = (this.widthAndHeight) * rowCopy + realColumnNumber + this.widthAndHeight;
                                    this.collisionBoard[differenceCopy] = 1;
                                }
                                moved = true;
                                // this.collisionBoard[nextIndex] = 1;
                                columnNumber = -1; // because we have to reiterate through the columns now that there is an extra 0;    
                                rowNumber = -1;
                                break;
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
        // console.log("Ending moveDown()");
        return moved;
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
                    if (currentCell == leftValue+0) {
                        return false;
                    }
                }

                // rightValue test
                // we are the rightmost cell in the row.
                if (columnNumber == this.widthAndHeight - 1) {
                    rightValue = -1;
                } else {
                    rightValue = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber + 1];
                    if (currentCell == rightValue+0) {
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
                    if (currentCell == upValue+0) {
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
                    if (currentCell == downValue+0) {
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
        // console.log("In setupNewGame. widthAndHeight is: " + widthAndHeight);
        // let newGameState = {
        //     board: [widthAndHeight * widthAndHeight], // One dimensional array representing the board. Formula for location on the board is = widthAndHeight*desiredRowNumber+desiredColumnNumber;
        //     score: 0, // The score of the game at the current instant in time. Initially, the score should be set to zero. Every time the player makes a move that combines two tiles, the combined value should be added to the score (e.g. if two 128 tiles are merged to make a 256 tile, then you add 256 to the score).
        //     won: false, //True if a user has combined two 1024 tiles to make a 2048 tile
        //     over: false // True if the board is in a state such that no more moves can be made

        // };
        // this.gameState = newGameState;

        for(let i = 0; i < this.widthAndHeight * this.widthAndHeight; i++) {
            this.gameState.board[i] = 0;
            this.collisionBoard[i] = 0;
        }
        this.gameState.score = 0;
        this.gameState.won = false;
        this.gameState.over = false;
        
        // this.collisionBoard = [widthAndHeight * widthAndHeight].fill(0);
        // newGameState.board.fill(0);
        // console.log("Generating new tiles in setupNewGame.");
        // Object.assign(this.gameState, newGameState);
        this.generateNewTiles(2);
        // console.log("done generating tiles in setupNewGame");

        
    }

    loadGame(gS) {
        this.gameState = gS;
        for(let i = 0; i < this.widthAndHeight * this.widthAndHeight; i++) {
            this.collisionBoard[i] = 0;
        }
    }

    toString() {
        let array = [this.widthAndHeight][this.widthAndHeight];
        let string = "";
        // console.log("Printing Gameboard (starting from 0): ");
        for (let rowNumber = 0; rowNumber < this.widthAndHeight; rowNumber++) {
            string += "[";
            for (let columnNumber = 0; columnNumber < this.widthAndHeight; columnNumber++) {
                // console.log("index is: " + ((this.widthAndHeight) * rowNumber + columnNumber));
                let currentCell = this.gameState.board[(this.widthAndHeight) * rowNumber + columnNumber];
                // console.log("" + currentCell + ",");
                string += (currentCell + ",");
                
            }
            string += "]\n";

        }
        // console.log(string);

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

    checkIfLeft() {
        for(let row = 0; row < this.widthAndHeight - 1; row++) {
            for(let column = 0; column < this.widthAndHeight - 1; column++) {
                let currentCell = this.gameState.board[this.widthAndHeight * row + column];
                if(column == 1) {
                    continue;
                }
                let previousCell = this.gameState.board[this.widthAndHeight * row + (column - 1)];
                if (previousCell == 0) {
                    return true;
                }
                if (previousCell == currentCell) {
                    return true;
                }
            }
        }
        return false;
    }

    checkIfRight() {
        for(let row = 0; row < this.widthAndHeight - 1; row++) {
            for(let column = 0; column < this.widthAndHeight - 1; column++) {
                let currentCell = this.gameState.board[this.widthAndHeight * row + column];
                if(column == this.widthAndHeight - 1) {
                    continue;
                }
                let nextCell = this.gameState.board[this.widthAndHeight * row + (column +1)];
                if (nextCell == 0) {
                    return true;
                }
                if (nextCell == currentCell) {
                    return true;
                }
            }
        }
        return false;
    }

    checkIfUp() {
        for(let row = 0; row < this.widthAndHeight - 1; row++) {
            for(let column = 0; column < this.widthAndHeight - 1; column++) {
                let currentCell = this.gameState.board[this.widthAndHeight * row + column];
                if(row == 0) {
                    continue;
                }
                let previousCell = this.gameState.board[this.widthAndHeight * (row - 1) + column];
                if (previousCell == 0) {
                    return true;
                }
                if (previousCell == currentCell) {
                    return true;
                }
            }
        }
        return false;
    }

    checkIfDown() {
        for(let row = 0; row < this.widthAndHeight - 1; row++) {
            for(let column = 0; column < this.widthAndHeight - 1; column++) {
                let currentCell = this.gameState.board[this.widthAndHeight * row + column];
                if(row == this.widthAndHeight - 1) {
                    continue;
                }
                let nextCell = this.gameState.board[this.widthAndHeight * (row + 1) + column];
                if (nextCell == 0) {
                    return true;
                }
                if (nextCell == currentCell) {
                    return true;
                }
            }
        }
        return false;
    }

    
}

