//10/01/23
//mini battleship project
var rs = require("readline-sync");
/**
🛠 Requirements: Part 1
1. When the application loads, print the text, "Press any key to start the game."
//log "Press any key to start the game."

2. When the user presses the key, your code will randomly place two different ships in two separate locations on the board. Each ship is only 1 unit long (In the real game ships are 2+ in length).
//need a click event to start the function
//randomly have two locations filled on the board. Use number randomizer?

3. The prompt will then say, "Enter a location to strike ie 'A2' "
//log "Enter a location to strike"

4. The user will then enter a location. If there is a ship at that location the prompt will read, "Hit. You have sunk a battleship. 1 ship remaining."
//have an array that keeps track of the users input
//have an array that has the randomized locations inside, if the users response is included in the array, log "Hit. You have sunk a battleship"
//remove hit ship from the array, log out the length of the array

5. If there is not a ship at that location the prompt will read, "You have missed!"
//if user input is not in the shipArray, log "You have missed!"

6. If you enter a location you have already guessed the prompt will read, "You have already picked this location. Miss!"
//if userInput is already in the guessedArray, log "You have already picked this location. Miss!"

7. When both of the battleships have been destroyed the prompt will read, "You have destroyed all battleships. Would you like to play again? Y/N"
//when the shipsArray.length === 0, log "You have destroyed all battleships. Would you like to play again? Y/N"


8. If "Y" is selected the game starts over. If "N" then the application ends itself.
//if y, call the starting function again
//if n, break out of the function

 */

let randomArray = [];
let guessArray = [];
// let boardArray = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
// let userLetter;
// let userNumber;

const boardArray = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//randomizer should put two values at chosen index into the random array
let max = 3;

const buildGrid = (max) => {
  const resArr = [];
  for (let i = 0; i < max; i++) {
    resArr.push([]);
    for (let j = 0; j < max; j++) {
      resArr[i].push(`${boardArray[i]}${j + 1}`);
    }
  }
  return resArr;
};

const gameBoard = buildGrid(max);
const playerGame = gameBoard.flat();

function getRandomInt() {
  return Math.floor(Math.random() * playerGame.length);
}

function startGame() {
  // use keyInPause instead of question, lets you use any key aside from enter to immediately start
  let userStart = rs.keyInPause(`"Press any key to start the game."`);
  let battleship1 = getRandomInt();
  let battleship2 = getRandomInt();
  randomArray.push(playerGame[battleship1]);
  if (battleship2 === battleship1) {
    battleship2 = getRandomInt(max - 1);
    randomArray.push(playerGame[battleship2]);
  } else {
    randomArray.push(playerGame[battleship2]);
  }
  console.log(randomArray);
  return userStart;
}

let userAttack = () => {
  return rs.question("Enter a location to strike. ie 'A2': ", {
    limit: playerGame,
    limitMessage: `choose a letter in the alphabet up to ${
      boardArray[max - 1]
    } and a number up to ${max}.`,
  });
};

const makeAGuess = () => {
  let userGuess = userAttack().toUpperCase();
  console.log("this is userGuess", userGuess);
  if (guessArray.includes(userGuess)) {
    console.log("You have already picked this location. Miss!");
    makingAGuess();
  } else {
    if (!randomArray.includes(userGuess)) {
      console.log("You have missed!");
      console.log(randomArray);
      guessArray.push(userGuess);
      console.log(guessArray);
      makingAGuess();
    } else {
      randomArray = randomArray.filter((ship) => ship !== userGuess);
      console.log(randomArray);
      guessArray.push(userGuess);
      console.log(guessArray);
      if (randomArray.length >= 1) {
        console.log(
          `Hit. You have sunk a battleship. ${randomArray.length} ship remaining.`
        );
        makingAGuess();
      } else {
        guessArray = [];
        let win = rs.question(
          "You have destroyed all battleships. Would you like to play again? Y/N: ",
          {
            limit: ["y", "n"],
            limitMessage:
              "select y or n, a rematch is clearly needed, by selecting n, you may go this time, but know that I have won that round by default!",
          }
        );

        if (win === "y") {
          playGame();
        } else {
          process.exit();
        }
      }
    }
  }
  return guessArray;
};

//logic
function makingAGuess() {
  makeAGuess();
}

function playGame() {
  startGame();
  makingAGuess();
}

playGame();
