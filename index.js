//////////////////////////////////////////////////
// FOR AN EHANCED VERSION COMMENT BELOW AND UNCOMMENT AT BOTTOM, REFRESH PAGE ON BROWSER
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
        var board = document.createElement("div"); // create new board element
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
        var notification = document.getElementById("notification-banner"); 
        notification.innerHTML = this.notification; // update the banner message
    } 

    toggleResetButton () {
        var resetBtn = document.getElementById("reset");
        resetBtn.className = resetBtn.className === "disabled" ? "" : "disabled"; // toggle the reset botton on the dom
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





//////////////////////////////////////////////////
// ENHANCED VERSION
// DISPLAY TURN
// DECLARE WINNER
//////////////////////////////////////////////////

// // define square class to handle logic for each square
// class Square {
//     constructor () {
//         Square.instance = (Square.instance || 0) + 1; // we'll use instances to track each square
//         this.played = false; // all squares initialize as unplayed
//         this.id = Square.instance; // asign the current instance as the id of each new square
//     }

//     onClick () { 
//         if (!this.played) {
//             this.played = true; // squares update to played
//             this.innerHTML = game.player; // the current player is set on the played square
//             game.played(this.accessKey); // call the games played function to handle updating the player and checking if the game is complete
//         }
//     }

//     generate () {
//         let square = document.createElement("div"); // create new square element
//         square.className = "square";
//         square.accessKey = this.id;
//         square.onclick = this.onClick; // apply the on click handler

//         return square; // return square, the board will use this to populate the dom
//     }

//     static reset () {
//         Square.instance = 0; // when the board resets, we'll need to reset our instance properly track squares
//     }
// }

// // define board class to handle game board logic
// class Board {
//     constructor () {
//         this.generate(); // when boards are instantiated they immediately call generate to populate the dom
//     }

//     generate () {
//         var board = document.createElement("div"); // create new board element
//         board.id = "board";
//         document.body.append(board); // add the board to the dom
//         this.populate(); // populate the game board
//     }

//     populate () {
//         for(let i = 0; i < 9; i++) { // our game will always require 9 squares
//             let square = new Square();  // call a new instance of square for each iteration
//             document.getElementById("board").append(square.generate()); // append the new square to the dom
//         }
//     }

//     reset () {
//         document.body.removeChild(document.getElementById("board")); // to reset, find find and remove the existing board
//         this.generate(); // generate a fresh board
//     }
// }

// // define game class to handle game logic
// class Game {
//     constructor () {
//         this.board = new Board(); // instantiate a game with a fresh board
//         this.moves = 0; // currently, the game ends when all squares have been played, we'll increment plays
//         this.player = "X"; // when games instantiate, "X" is the first player
//         this.notification = `Player ${this.player}'s turn`;
//         this.toggleNotification();
//         this.wins = [ [1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,5,7], [3,6,9], [4,5,6], [7,8,9] ]; // possible wins on our board
//         this.x = []; // track moves for player x
//         this.o = []; // track moves for player o
//     }

//     updateBanner () {
//         var notification = document.getElementById("notification-banner"); 
//         notification.innerHTML = this.notification; // update the banner message
//     } 

//     toggleResetButton () {
//         var resetBtn = document.getElementById("reset");
//         resetBtn.className = resetBtn.className === "disabled" ? "" : "disabled"; // toggle the reset botton on the dom
//         resetBtn.onclick = () => {
//             Square.reset(); // reset our square class
//             this.board.reset(); // reset our board class
//             this.reset(); // reset props on the game class
//         }
//     }

//     toggleNotification () {
//         this.updateBanner(); // refreshes the notification banner
//         this.toggleResetButton(); // refreshes the reset button
//     }

//     updatePlayer () {
//         this.player = this.player === "X" ? "O" : "X"; // after each turn, update the player
//         this.notification = `Player ${this.player}'s turn`; // update the notification to reflect the current player
//         this.updateBanner(); // refresh the notification banner
//     }

//     checkWinner(key) {
//         function checkOverlap(moves, win) { // since we're storing the possible wins as sub arrays, we could declare a winner if any of the possible sub arrays exist in either users moves
//             return win.every((move) => { // we find overlap if every element in each win sequence is present in a users moves array
//                 return (moves.includes(move));
//             })
//         }

//         for (let i = 0; i < this.wins.length; i++) { // iterate through the wins array to check each win sequence
//             if (checkOverlap(this.x, this.wins[i])) this.winner = "X"; // check if player x has won
//             if (checkOverlap(this.o, this.wins[i])) this.winner = "O"; // check if player o has won
//         };
//     }

//     declareWinner () {
//         this.notification = `Player ${this.winner} wins!`; // update the notification banner
//         this.toggleNotification(); // refresh banner and reset btn
//     }

//     checkComplete(key) {
//         this.checkWinner(key);
//         if (this.winner) this.declareWinner();
//         if (this.plays === 9 && !this.winner) { // check the current number of plays, since the game is set to complete when all squares have been played, we'll check for 9 plays
//             this.notification = "Game Over"; // update the notification banner
//             this.toggleNotification(); // refresh banner and reset btn
//         }
//     }

//     played (key) {
//         this.plays++; // increment the number of plays
//         this.player === "X" ? this.x.push(parseInt(key)) : this.o.push(parseInt(key));
//         this.updatePlayer(); // update the player for the next turn
//         this.checkComplete(key); // check if the game is complete
//     }

//     reset () {
//         this.plays = 0; // reset the number of plays
//         this.player = "X"; // reset the starting player to "X"
//         this.notification = `Player ${this.player}'s turn`; // reset notification message
//         this.winner = ""; // reset winner
//         this.x = []; // clear moves for x
//         this.o = []; // clear moves for o
//         this.toggleNotification(); // refresh banner and reset btn
//     }
// }

// var game = new Game(); // instantiate a new game