//////////////////////////////////////////////////
// BASIC VERSION
//////////////////////////////////////////////////

// define square class to handle logic for each square
class Square {
    constructor () {
        this.played = false; // all squares initialize as unplayed
    }

    onClick () { 
        if (!this.played) {
            this.played = true; // squares update to played
            this.innerHTML = game.player; // the current player is set on the played square
            game.played(); // call the games played function to handle updating the player and checking if the game is complete
        }
    }

    generate () {
        let square = document.createElement("div"); // create new square element
        square.className = "square";
        square.onclick = this.onClick; // apply the on click handler

        return square; // return square, the board will use this to populate the dom
    }
}

// define board class to handle game board logic
class Board {
    constructor () {
        this.generate(); // when boards are instantiated they immediately call generate to populate the dom
    }

    generate () {
        let board = document.createElement("div"); // create new board element
        board.id = "board";
        document.body.append(board); // add the board to the dom
        this.populate(); // populate the game board
    }

    populate () {
        for(let i = 0; i < 9; i++) { // our game will always require 9 squares
            let square = new Square();  // call a new instance of square for each iteration
            document.getElementById("board").append(square.generate()); // append the new square to the dom
        }
    }

    reset () {
        document.body.removeChild(document.getElementById("board")); // to reset, find find and remove the existing board
        this.generate(); // generate a fresh board
    }
}

// define game class to handle game logic
class Game {
    constructor () {
        this.board = new Board(); // instantiate a game with a fresh board
        this.plays = 0; // currently, the game ends when all squares have been played, we'll increment plays
        this.player = "X"; // when games instantiate, "X" is the first player
        this.notification = "";
        this.toggleResetButton();
    }

    updateBanner () {
        let notification = document.getElementById("notification-banner"); 
        notification.innerHTML = this.notification; // update the banner message
    } 

    toggleResetButton () {
        let resetBtn = document.getElementById("reset");
        resetBtn.onclick = () => {
            this.board.reset(); // reset our board class
            this.reset(); // reset props on the game class
        }
    }

    toggleNotification () {
        this.updateBanner(); // refreshes the notification banner
        this.toggleResetButton(); // refreshes the reset button
    }

    updatePlayer () {
        this.player = this.player === "X" ? "O" : "X"; // after each turn, update the player
    }

    checkComplete() {
        if (this.plays === 9) { // check the current number of plays, since the game is set to complete when all squares have been played, we'll check for 9 plays
            this.notification = "Game Over";
            this.toggleNotification();
        }
    }

    played () {
        this.plays++; // increment the number of plays
        this.updatePlayer(); // update the player for the next turn
        this.checkComplete(); // check if the game is complete
    }

    reset () {
        this.plays = 0; // reset the number of plays
        this.player = "X"; // reset the starting player to "X"
        this.notification = "";
        this.toggleNotification();
    }
}

var game = new Game(); // instantiate a new game