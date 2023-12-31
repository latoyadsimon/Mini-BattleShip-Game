//10/10/23
//Most current file for turn in

var rs = require("readline-sync");

//user input
let guessArray = [];

//the gameBoard
let loadedBoard = [];

//grid builder
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

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

//here is where you decide how big you want the grid to be
const gridSize = 10;
const grid = buildGrid(gridSize);
const max = grid.length;

//random number generator
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

function startGame() {
  let userStart = rs.keyInPause(`"Press any key to start the game."`);
  //   console.log(grid);
  console.log(grid.flat());
  twoUnit1 = generateShipCoord(grid, 2);
  threeUnit1 = generateShipCoord(grid, 3);
  threeUnit2 = generateShipCoord(grid, 3);
  fourUnit1 = generateShipCoord(grid, 4);
  fiveUnit1 = generateShipCoord(grid, 5);

  console.log("this is the loaded board: ", loadedBoard);

  return userStart;
}

//generates the ship locations for loadedBoard
const generateShipCoord = (grid, units) => {
  const resArr = [];
  const direction = getRandomInt(2);
  const x = getRandomInt(grid.length);
  const y = getRandomInt(grid.length);
  let gridSize = grid[0].length;
  let axis = direction === 0 ? y : x;

  //creates the boat at the location, if it goes off board or overlaps call the function again
  if (axis + units < gridSize) {
    for (let i = 0; i < units; i++) {
      let coord = direction === 0 ? grid[x][y + i] : grid[x + i][y];
      if (!loadedBoard.flat().includes(coord)) {
        resArr.push(coord);
      }
    }
  } else {
    return generateShipCoord(grid, units);
  }

  //if the boat is not "units" long, call the function again else send it to loadedBoard
  if (resArr.length !== units) {
    return generateShipCoord(grid, units);
  } else {
    loadedBoard.push(resArr);
    return resArr;
  }
};

const userAttack = () => {
  return rs.question("Enter a location to strike. ie 'A2': ", {
    limit: grid.flat(),
    limitMessage: `choose a letter in the alphabet up to ${
      alphabet[max - 1]
    } and a number up to ${max}.`,
  });
};

const makeAGuess = () => {
  let userGuess = userAttack().toUpperCase();
  console.log("the userGuess and guessArray", userGuess, guessArray);

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

    if (ship.includes(userGuess)) {
      hit = true;
      ship = ship.filter((unit) => unit !== userGuess);
      loadedBoard[i] = ship;
      console.log("You got a hit!!");
      console.log("refreshed loadedBoard ", loadedBoard);
      console.log("hit taken off ship so this remains: ", ship);

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

// logic
function makingAGuess() {
  makeAGuess();
}

function playGame() {
  startGame();
  makingAGuess();
}

playGame();
