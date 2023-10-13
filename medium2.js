//Article finished on 10/13/2023
// https://medium.com/@1stforgottentoy/mini-battleship-console-game-tutorial-d55b7f481272

//resources:

/**
 * 
console.table():
https://developer.mozilla.org/en-US/docs/Web/API/console/table

readlineSync NPM:
https://www.npmjs.com/package/readline-sync

 */

/**
1.	When the application loads, print the text, "Press any key to start the game."
    1.	Log to console
    2.	Use readline sync keyInPause
2.	When the user presses the key, your code will randomly place two different ships in two separate locations on the board. Each ship is only 1 unit long (In the real game ships are 2+ in length).
    1.	Need to use a random number generator
    2.	Need a board for the ships to be generated onto, an array or object
    3.	Need an array that keeps track of the ships locations on that board
3.	The prompt will then say, "Enter a location to strike ie 'A2' "
    1.	Log to the console
    2.	Use readline sync question
4.	The user will then enter a location. If there is a ship at that location the prompt will read, "Hit. You have sunk a battleship. 1 ship remaining."
    1.	Need to be able to search through the board and compare the locations to the users guess
    2.	An array to keep track of the users input
    3.	Log to the console a hit when the users input matches whats in the ships array
5.	If there is not a ship at that location the prompt will read, "You have missed!"
    1.	Log to the console when the users guess does not match whats in the ship array
6.	If you enter a location you have already guessed the prompt will read, "You have already picked this location. Miss!"
    1.	If the users guess is already in the array, log to the console a miss
7.	When both of the battleships have been destroyed the prompt will read, "You have destroyed all battleships. Would you like to play again? Y/N"
    1.	Need a way to track that both ships are hit, maybe take them out of the array
    2.	When the array.length is zero, log to the console a win
    3.	Ask if you user wants to play again, we can use readline sync 
8.	If "Y" is selected the game starts over. If "N" then the application ends itself.
    1.	If yes, call the game start again
    2.	If no, end the process
*/

// // 1.	When the application loads, print the text, "Press any key to start the game."
// //     1.	Log to console

// // We will use readlineSync
// var rs = require("readline-sync");

// //keyInPause will start the process when the user presses any key aside from enter.
// rs.keyInPause("Press any key to start the game.");

// 2.	When the user presses the key, your code will randomly place two different ships in two separate locations on the board. Each ship is only 1 unit long (In the real game ships are 2+ in length).
//     1.	Need to use a random number generator
//     2.	Need a board for the ships to be generated onto, an array or object
//     3.	Need an array that keeps track of the ships locations on that board

//random number generator

// function getRandomInt(units) {
//   return Math.floor(Math.random() * max);
// }

// //grid builder
// const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
// console.log(alphabet);

// const gridSize = 3;
// function buildGrid(gridSize) {
//   const resArr = [];
//   for (let i = 0; i < gridSize; i++) {
//     resArr.push([]);
//     for (let j = 0; j < gridSize; j++) {
//       resArr[i].push(`${alphabet[i]}${j + 1}`);
//     }
//   }
//   return resArr;
// }

// const gameBoard = buildGrid(gridSize);
// console.log(gameBoard);

// //place to keep our ship coordinates
// let loadedBoard = [];
// const flatGameBoard = gameBoard.flat();
// const max = flatGameBoard.length;

// function loadBoard() {
//   let enemyShip1 = getRandomInt(1);
//   let enemyShip2 = getRandomInt(1);

//   if (enemyShip1 === enemyShip2) {
//     loadBoard();
//   } else {
//     loadedBoard.push(flatGameBoard[enemyShip1]);
//     loadedBoard.push(flatGameBoard[enemyShip2]);
//   }
//   console.log("this is the loadedBoard: ", loadedBoard);
//   return "Enemy ships have been loaded!!";
// }
// loadBoard();

// // 3.	The prompt will then say, "Enter a location to strike ie 'A2' "
// //     1.	Log to the console
// //     2.	Use readline sync question

// const userGuess = () => {
//   return rs.question("Enter a location to strike. ie 'A2': ", {
//     limit: flatGameBoard,
//     limitMessage: `choose a letter in the alphabet up to ${
//       alphabet[gridSize - 1]
//     } and a number up to ${gridSize}.`,
//   });
// };
// userGuess();

// 4.	The user will then enter a location. If there is a ship at that location the prompt will read, "Hit. You have sunk a battleship. 1 ship remaining."
//     1.	Need to be able to search through the board and compare the locations to the users guess
//     2.	An array to keep track of the users input
//     3.	Log to the console a hit when the users input matches whats in the ships array
// 5.	If there is not a ship at that location the prompt will read, "You have missed!"
//     1.	Log to the console when the users guess does not match whats in the ship array
//else statement for number 4

let guessArray = [];
const userAttack = () => {
  let usersGuess = userGuess().toUpperCase();
  console.log(("this is usersGuess: ", usersGuess));

  if (loadedBoard.includes(usersGuess)) {
    guessArray.push(usersGuess);
    console.log("Hit!");
    console.log(`"You have sunk a battleship! 1 ship remaining."`);
  } else {
    guessArray.push(usersGuess);
    console.log("You have Missed!");
    console.log(`"You have not sunk a battleship! 2 ships remaining."`);
  }
};
userAttack();

// 6.	If you enter a location you have already guessed the prompt will read, "You have already picked this location. Miss!"
//     1.	If the users guess is already in the array, log to the console a miss

// let guessArray = [];
// const userAttack = () => {
//   let usersGuess = userGuess().toUpperCase();
//   console.log(("this is usersGuess: ", usersGuess));

//   if (!guessArray.includes(usersGuess)) {
//     guessArray.push(usersGuess);
//     if (loadedBoard.includes(usersGuess)) {
//       console.log("Hit!");

//       console.log(`"You have sunk a battleship! 1 ship remaining."`);
//     } else {
//       console.log("You have Missed!");
//       console.log(`"You have not sunk a battleship! 2 ships remaining."`);
//     }
//   } else {
//     console.log("You have already picked this location. Miss!");
//   }
// };
// userAttack();

// 7.	When both of the battleships have been destroyed the prompt will read, "You have destroyed all battleships. Would you like to play again? Y/N"
//     1.	Need a way to track that both ships are hit, maybe take them out of the array
//     2.	When the array.length is zero, log to the console a win
//     3.	Ask if your user wants to play again, we can use readline sync

// let guessArray = [];
// const userAttack = () => {
//   let usersGuess = userGuess().toUpperCase();
//   console.log(("this is usersGuess: ", usersGuess));

//   if (!guessArray.includes(usersGuess)) {
//     if (loadedBoard.includes(usersGuess)) {
//       guessArray.push(usersGuess);
//       console.log("Hit!");
//       loadedBoard = loadedBoard.filter((ship) => ship !== usersGuess);
//       console.log(
//         `"You have sunk a battleship! ${loadedBoard.length} ship(s) remaining."`
//       );
//     } else {
//       console.log("You have Missed!");
//       console.log(
//         `"You have not sunk a battleship! ${loadedBoard.length} ship(s) remaining."`
//       );
//     }
//   } else {
//     console.log("You have already picked this location. Miss!");
//   }

// };
// userAttack();

//next part of number 7
// let guessArray = [];
// const userAttack = () => {
//   let usersGuess = userGuess().toUpperCase();
//   console.log(("this is usersGuess: ", usersGuess));

//   if (!guessArray.includes(usersGuess)) {
//     if (loadedBoard.includes(usersGuess)) {
//       guessArray.push(usersGuess);
//       console.log("Hit!");
//       loadedBoard = loadedBoard.filter((ship) => ship !== usersGuess);
//       console.log(
//         `"You have sunk a battleship! ${loadedBoard.length} ship(s) remaining."`
//       );
//     } else {
//       console.log("You have Missed!");
//       console.log(
//         `"You have not sunk a battleship! ${loadedBoard.length} ship(s) remaining."`
//       );
//     }
//   } else {
//     console.log("You have already picked this location. Miss!");
//   }
//   guessAgain();
// };
// userAttack();

// const guessAgain = () => {
//   if (loadedBoard.length < 1) {
//     guessArray = [];
//     let win = rs.keyInYN(
//       "You have destroyed all battleships. Would you like to play again?: "
//     );

//     if (win) {
//       playGame();
//     } else {
//       process.exit();
//     }
//   }
// };

// 8.	If "Y" is selected the game starts over. If "N" then the application ends itself.
//     1.	If yes, call the game start again
//     2.	If no, end the process
//Lets set up some logic to help the game run smoothly.

// var rs = require("readline-sync");

// //random number generator
// function getRandomInt(units) {
//   return Math.floor(Math.random() * max);
// }

// //grid builder
// const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
// console.log(alphabet);

// const gridSize = 3;
// function buildGrid(gridSize) {
//   const resArr = [];
//   for (let i = 0; i < gridSize; i++) {
//     resArr.push([]);
//     for (let j = 0; j < gridSize; j++) {
//       resArr[i].push(`${alphabet[i]}${j + 1}`);
//     }
//   }
//   return resArr;
// }

// const gameBoard = buildGrid(gridSize);
// console.log(gameBoard);

// //place to keep our ship coordinates
// let loadedBoard = [];
// const flatGameBoard = gameBoard.flat();
// //to be used in the random number generator
// const max = flatGameBoard.length;

// function loadBoard() {
//   let enemyShip1 = getRandomInt(1);
//   let enemyShip2 = getRandomInt(1);

//   if (enemyShip1 === enemyShip2) {
//     loadBoard();
//   } else {
//     loadedBoard.push(flatGameBoard[enemyShip1]);
//     loadedBoard.push(flatGameBoard[enemyShip2]);
//   }
//   console.log("Enemy ships have been loaded!!");

//   return loadedBoard;
// }

// const startGame = () => {
//   rs.keyInPause("Press any key to start the game.");
//   loadedBoard = loadBoard();
//   console.log(loadedBoard);
// };

// const userGuess = () => {
//   return rs.question("Enter a location to strike. ie 'A2': ", {
//     limit: flatGameBoard,
//     limitMessage: `choose a letter in the alphabet up to ${
//       alphabet[gridSize - 1]
//     } and a number up to ${gridSize}.`,
//   });
// };

// let guessArray = [];
// const userAttack = () => {
//   let usersGuess = userGuess().toUpperCase();
//   console.log(("this is usersGuess: ", usersGuess));

//   if (!guessArray.includes(usersGuess)) {
//     guessArray.push(usersGuess);

//     if (loadedBoard.includes(usersGuess)) {
//       console.log("Hit!");
//       loadedBoard = loadedBoard.filter((ship) => ship !== usersGuess);
//       console.log(
//         `"You have sunk a battleship! ${loadedBoard.length} ship(s) remaining."`
//       );
//     } else {
//       console.log("You have Missed!");
//       console.log(
//         `"You have not sunk a battleship! ${loadedBoard.length} ship(s) remaining."`
//       );
//       console.log(loadedBoard);
//     }
//   } else {
//     console.log("You have already picked this location. Miss!");
//   }
//   guessAgain();
// };

// const guessAgain = () => {
//   if (loadedBoard.length < 1) {
//     guessArray = [];
//     let win = rs.keyInYN(
//       "You have destroyed all battleships. Would you like to play again?: "
//     );

//     if (win) {
//       playGame();
//     } else {
//       process.exit();
//     }
//   } else {
//     makingAGuess();
//   }
// };

// //logic to start game
// function makingAGuess() {
//   userAttack();
// }

// function playGame() {
//   startGame();
//   makingAGuess();
// }

// playGame();
