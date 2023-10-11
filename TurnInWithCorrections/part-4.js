var rs = require("readline-sync");

//user input
let playerGuessArray = [];
let compGuessArray = [];
let user = true;

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

// //this one gives me the table visual i want, items revealed

// const buildGridObj2 = (max) => {
//   const resArr = {};
//   for (let i = 0; i < max; i++) {
//     let letter = alphabet[i];

//     resArr[letter] = {};

//     for (let j = 0; j < max; j++) {

//       resArr[letter][j + 1] = `${letter}${j + 1}`;

//     }
//   }

//   return resArr;
// };

//let the info be disguised
const buildGridObj2 = (max) => {
  let square = "\u22A1";
  const resArr = {};
  for (let i = 0; i < max; i++) {
    let letter = alphabet[i];
    resArr[letter] = {};
    for (let j = 0; j < max; j++) {
      resArr[letter][j + 1] = `${square}`;
    }
  }
  return resArr;
};

//playerGrid in part 3
let userGrid = buildGridObj2(gridSize);
let computerGrid = buildGridObj2(gridSize);

function startGame() {
  let userStart = rs.keyInPause(`"Press any key to start the game."`);

  //   console.log("this is the max: ", max);
  //   console.log("this is the grid flattened: ", grid.flat());

  //   userGrid = buildGridObj2(gridSize);
  console.log("can you see this player!!!!!!");
  console.table(userGrid);

  //   computerGrid = buildGridObj2(gridSize);
  console.log("can you see this computer!!!!!!");
  console.table(computerGrid);

  console.log("This is playerGame: ", playerGame);
  console.log("This is compGame: ", compGame);

  return userStart;
}

//generates the ship locations
const generateShipCoord = (grid, units) => {
  const resArr = [];
  const direction = getRandomInt(2);
  const x = getRandomInt(grid.length);
  const y = getRandomInt(grid.length);
  let gridSize = grid[0].length;
  let axis = direction === 0 ? y : x;

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

  if (resArr.length !== units) {
    return generateShipCoord(grid, units);
  } else {
    if (units > 1) {
      loadedBoard.push(resArr);
    }
    return resArr;
  }
};

function getLoaded() {
  loadedBoard = [];
  twoUnit1 = generateShipCoord(grid, 2);
  threeUnit1 = generateShipCoord(grid, 3);
  threeUnit2 = generateShipCoord(grid, 3);
  fourUnit1 = generateShipCoord(grid, 4);
  fiveUnit1 = generateShipCoord(grid, 5);

  return loadedBoard;
}

let playerGame = getLoaded();
let compGame = getLoaded();

const userAttack = () => {
  return rs.question("Enter a location to strike. ie 'A2': ", {
    limit: grid.flat(),
    limitMessage: `choose a letter in the alphabet up to ${
      alphabet[max - 1]
    } and a number up to ${max}.`,
  });
};

const makeAGuess = () => {
  let userGuess = "";
  let guessArray = [];
  playerGrid = [];

  if (user === true) {
    guessArray = [...playerGuessArray];
    loadedBoard = playerGame;
    playerGrid = userGrid;
    userGuess = userAttack().toUpperCase();
    console.log("the userGuess and guessArray", userGuess, guessArray);
  } else {
    guessArray = [...compGuessArray];
    loadedBoard = compGame;
    playerGrid = computerGrid;
    let guess = generateShipCoord(grid, 1);
    userGuess = guess[0];
    console.log("the userGuess and guessArray", userGuess, guessArray);
  }

  let coord = userGuess.split("");
  if (coord.length > 2) {
    coord[1] = coord[1] + coord[2];
    console.log("coord fixed: ", coord[0], coord[1]);
  }

  if (guessArray.includes(userGuess)) {
    console.log("You have already picked this location. Miss!");
    user = !user;
    makingAGuess();
  } else {
    guessCtn(userGuess, coord, guessArray);
  }

  return guessArray;
};

const guessCtn = (userGuess, coord, guessArray) => {
  let hit = false;
  guessArray.push(userGuess);

  if (user === true) {
    playerGuessArray = [...guessArray];
    user = !user;
    console.log("playerGuessArray: ", playerGuessArray);
  } else {
    compGuessArray = [...guessArray];
    user = !user;
    console.log("compGuessArray: ", compGuessArray);
  }

  for (let i = 0; i < loadedBoard.length; i++) {
    let ship = loadedBoard[i];

    if (ship.includes(userGuess)) {
      hit = true;
      playerGrid[coord[0]][coord[1]] = "O";
      ship = ship.filter((unit) => unit !== userGuess);
      loadedBoard[i] = ship;
      console.log("You got a hit!!");
      console.log("refreshed loadedBoard ", loadedBoard);
      console.log("hit taken off ship so this remains: ", ship);
      console.table(playerGrid);

      shipLengthUnderOne(ship);

      boardLengthUnderOne(userGuess);
    }
  }

  hitStatus(hit, userGuess, coord, guessArray);
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

const boardLengthUnderOne = (userGuess) => {
  if (loadedBoard.length < 1) {
    if (playerGuessArray.includes(userGuess)) {
      console.log("Player, you have defeated me!!!!! NaaaaaNIIIIII????!!!");
    } else {
      console.log(
        "Computer wins!!!! Nanni Nanni Boo Boo, stick your head in Doo Doo!"
      );
    }
    guessArray = [];
    playerGuessArray = [];
    compGuessArray = [];
    userGrid = buildGridObj2(gridSize);
    computerGrid = buildGridObj2(gridSize);
    playerGame = getLoaded();
    compGame = getLoaded();

    let win = rs.keyInYN(
      "All battleships have been destroyed!!! Would you like to play again? Clearly a rematch is needed to ensure the battle was just!!! Buuuut, I am not afraid to accept Victory By default should you choose to walk away...: ",
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

const hitStatus = (hit, userGuess, coord, guessArray) => {
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

    missedGuess(userGuess, coord);
  }
};

const missedGuess = (userGuess, coord) => {
  let flatGrid = grid.flat();
  if (flatGrid.includes(userGuess)) {
    playerGrid[coord[0]][coord[1]] = "X";
  }

  console.table(playerGrid);

  if (loadedBoard === playerGame) {
    console.log("refreshed computerGrid:");
    console.table(computerGrid);
    userGrid = playerGrid;
  } else {
    console.log("refreshed userGrid: ");
    console.table(userGrid);
    computerGrid = playerGrid;
  }

  makingAGuess();
};

// logic

function makingAGuess() {
  if (user === true) {
    console.log("Player Turn!!!");

    makeAGuess();
  } else {
    console.log("Computer Turn!!!");
    makeAGuess();
  }
}

function playGame() {
  startGame();
  makingAGuess();
}

playGame();
