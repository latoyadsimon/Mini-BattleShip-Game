//10/04/2023

/**
🛠 Requirements: Part 3 (Optional, but will take your skills to a whole new level).
Instead of just printing "hit" or "miss" when you take a turn, have a GUI-based grid appear in the terminal. Use "O" for your misses and use "X" for your hits. After every turn, the grid will reprint with the proper data.


 */

//note to self: I used O for hits and x for misses, more visually appealing

//06:29am
//fixed this code and is now working as it should to play the game
//using part2-2copyFixing.js as a base for part3-3copy.js
//10/04/23
//at 3:53pm, this code works correctly for the game and displays a visual

var rs = require("readline-sync");

//grid builder
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//user input
let userLetter;
let userNumber;
let guessArray = [];

//the gameBoard
let loadedBoard = [];
let grid = [];

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

//random number generator
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

//generates the ship locations
const generateShipCoord = (grid, units) => {
  const resArr = [];
  const direction = getRandomInt(2);
  const x = getRandomInt(grid.length);
  const y = getRandomInt(grid.length);
  let gridSize = grid[0].length;

  if (direction === 0) {
    if (y + units < gridSize) {
      for (let i = 0; i < units; i++) {
        let coord = grid[x][y + i];

        if (!loadedBoard.flat().includes(coord)) {
          resArr.push(coord);
        }
      }
    } else {
      return generateShipCoord(grid, units);
    }
  } else {
    if (x + units < gridSize) {
      for (let i = 0; i < units; i++) {
        let coord = grid[x + i][y];

        if (!loadedBoard.flat().includes(grid[x + i][y])) {
          resArr.push(coord);
        }
      }
    } else {
      return generateShipCoord(grid, units);
    }
  }
  if (resArr.length !== units) {
    return generateShipCoord(grid, units);
  } else {
    loadedBoard.push(resArr);
    return resArr;
  }
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

const getLetter = (alphabet) => {
  userLetter = rs.question("Enter a location to strike. ", {
    limit: alphabet,
    limitMessage:
      "Choose between a letter else you should admit defeat peasant!",
  });
  return userLetter;
};

const getNumber = () => {
  userNumber = rs.questionInt("Enter a number. ", {
    limitMessage:
      "You have to choose a number lest you accept that your garden is overgrown and your cucumbers are soft!!",
  });
  return userNumber;
};

const makeAGuess = () => {
  let userGuess = "";
  let guess = userLetter + userNumber;
  userGuess += guess.toUpperCase();
  console.log("the userGuess and guessArray", userGuess, guessArray);
  let hit = false;

  let coord = userGuess.split("");
  if (coord.length > 2) {
    coord[1] = coord[1] + coord[2];
    console.log("coord fixed: ", coord[0], coord[1]);
  }

  if (guessArray.includes(userGuess)) {
    console.log("You have already picked this location. Miss!");
    makingAGuess();
  }

  //   //
  else {
    guessArray.push(userGuess);
    console.log("updated guessArray: ", guessArray);

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
        if (ship.length < 1) {
          loadedBoard = loadedBoard.filter((ship) => ship.length !== 0);
          console.log("One ship removed from loadedBoard: ", loadedBoard);
          console.log(
            `Hit! You have sunk a battleship! ${loadedBoard.length} ship(s) remaining.`
          );
        } else if (loadedBoard.length > 1) {
          makingAGuess();
        }

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
        hit === false;
      }
    }

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

      let flatGrid = grid.flat();
      if (flatGrid.includes(userGuess)) {
        playerGrid[coord[0]][coord[1]] = "X";
      } else {
        console.log(
          "That ain't even on the board!! Who you tryna shoot?? Jupiter???"
        );
      }
      console.table(playerGrid);

      makingAGuess();
    }
  }

  return guessArray;
};

// logic
function startGame() {
  let userStart = rs.question(`"Press any key to start the game."`);
  //enter in the argument here to change the grid size
  const gridSize = 10;
  grid = buildGrid(gridSize);

  const max = grid.length;
  console.log("this is the max: ", max);
  console.log("this is the grid flattened: ", grid.flat());

  playerGrid = buildGridObj2(gridSize);
  console.log("can you see this player!!!!!!");
  console.table(playerGrid);

  twoUnit1 = generateShipCoord(grid, 2);
  threeUnit1 = generateShipCoord(grid, 3);
  threeUnit2 = generateShipCoord(grid, 3);
  fourUnit1 = generateShipCoord(grid, 4);
  fiveUnit1 = generateShipCoord(grid, 5);

  console.log("this is the loaded board: ", loadedBoard);

  return grid;
}

function makingAGuess(grid) {
  getLetter(alphabet);
  getNumber();
  makeAGuess(grid);
}

function playGame() {
  startGame();
  makingAGuess();
}

playGame();
