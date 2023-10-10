//10/10/23
//Most current file for turn in
var rs = require("readline-sync");

let loadedBoard = [];
let guessArray = [];

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//randomizer should put two values at chosen index into the random array
let max = 3;

const buildGrid = (max) => {
  const resArr = [];
  for (let i = 0; i < max; i++) {
    resArr.push([]);
    for (let j = 0; j < max; j++) {
      resArr[i].push(`${alphabet[i]}${j + 1}`);
    }
  }
  return resArr;
};

const grid = buildGrid(max);
const playerGame = grid.flat();

function getRandomInt() {
  return Math.floor(Math.random() * playerGame.length);
}

function startGame() {
  let userStart = rs.keyInPause(`"Press any key to start the game."`);

  let battleship1 = getRandomInt();
  let battleship2 = getRandomInt();
  loadedBoard.push(playerGame[battleship1]);

  if (battleship2 === battleship1) {
    battleship2 = getRandomInt(max - 1);
    loadedBoard.push(playerGame[battleship2]);
  } else {
    loadedBoard.push(playerGame[battleship2]);
  }
  console.log(loadedBoard);
  return userStart;
}

const userAttack = () => {
  return rs.question("Enter a location to strike. ie 'A2': ", {
    limit: playerGame,
    limitMessage: `choose a letter in the alphabet up to ${
      alphabet[max - 1]
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
    guessCtn(userGuess);
  }

  return userGuess;
};

const guessCtn = (userGuess) => {
  let hit = false;
  guessArray.push(userGuess);
  console.log("updated guessArray: ", guessArray);

  for (let i = 0; i < loadedBoard.length; i++) {
    let ship = loadedBoard[i];

    if (ship === userGuess) {
      hit = true;
      loadedBoard = loadedBoard.filter((unit) => unit !== userGuess);

      console.log("You got a hit!!");
      console.log("refreshed loadedBoard ", loadedBoard);

      shipLengthUnderOne(ship);

      boardLengthUnderOne();
    }
  }

  hitStatus(hit);
};

const shipLengthUnderOne = (ship) => {
  if (ship.length < 1) {
    loadedBoard = loadedBoard.filter((ship) => ship.length !== 0);
    console.log("One ship removed from loadedBoard: ", loadedBoard);
    console.log(
      `Hit! You have sunk a battleship! ${loadedBoard.length} ship(s) remaining.`
    );
  } else if (loadedBoard.length > 1) {
    makingAGuess();
  }
};

const boardLengthUnderOne = () => {
  if (loadedBoard.length < 1) {
    guessArray = [];
    let win = rs.keyInYN(
      "You have destroyed all battleships. Would you like to play again?: ",
      {
        limitMessage:
          "select y or n, a rematch is clearly needed, by selecting n, you may go this time, but know that I have won that round by default!",
      }
    );
    if (win) {
      playGame();
    } else {
      process.exit();
    }
  }
};

const hitStatus = (hit) => {
  if (loadedBoard[loadedBoard.length - 1] && hit === true) {
    console.log("This is hit status: ", hit);
    makingAGuess();
  } else if (
    loadedBoard[loadedBoard.length - 1] &&
    hit === false &&
    loadedBoard.length >= 1
  ) {
    console.log("This is hit status: ", hit);

    console.log("You have missed!");

    console.log("updated guessArray after miss: ", guessArray);
    makingAGuess();
  }
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
