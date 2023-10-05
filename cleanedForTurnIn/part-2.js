//10/04/2023
//06:29am
//fixed this code and is now working as it should to play the game

/**
 * 
🛠 Requirements: Part 2
Only go to this step when you have successfully finished part 1.

Now we are going to make the game a little more realistic.

Rewrite the code so that we use letters A-J and numbers 1-10. This will create a 100 unit grid.
If you haven't already, create a function that builds the grid. This function will take a single number argument to build the grid accordingly. (i.e. buildGrid(3) will create a 3x3 grid (9 units), buildGrid(5) will create a 5x5 grid (25 units) buildGrid(10) creates a 10x10 (100 units), etc). 
The computer will now place multiple ships in this format:
One two-unit ship
Two three-unit ships
One four-unit ship
One five-unit ship
Keep in mind that your code cannot place two ships on intersecting paths
Ship placement should be random (horizontally and vertically placed) and not manually placed by you in the code
Ships must be placed within the grid boundaries
The game works as before, except now, all ships must be destroyed to win
 */

var rs = require("readline-sync");

//grid builder
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//user input
let userLetter;
let userNumber;
let guessArray = [];

//the gameBoard
let loadedBoard = [];

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
        ship = ship.filter((unit) => unit !== userGuess);
        loadedBoard[i] = ship;
        console.log("You got a hit!!");
        console.log("refreshed loadedBoard ", loadedBoard);
        console.log("hit taken off ship so this remains: ", ship);
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
  const grid = buildGrid(gridSize);
  const max = grid.length;
  console.log("this is the max: ", max);
  console.log("this is the grid flattened: ", grid.flat());

  twoUnit1 = generateShipCoord(grid, 2);
  threeUnit1 = generateShipCoord(grid, 3);
  threeUnit2 = generateShipCoord(grid, 3);
  fourUnit1 = generateShipCoord(grid, 4);
  fiveUnit1 = generateShipCoord(grid, 5);

  console.log("this is the loaded board: ", loadedBoard);

  return userStart;
}

function makingAGuess() {
  getLetter(alphabet);
  getNumber();
  makeAGuess();
}

function playGame() {
  startGame();
  makingAGuess();
}

playGame();
