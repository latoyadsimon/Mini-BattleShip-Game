//10/04/2023
//06:29am
//fixed this code and is now working as it should to play the game

var rs = require("readline-sync");

//grid builder
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//user input
let userLetter;
let userNumber;
let guessArray = [];

//the gameBoard
let loadedBoard = [];
let shipsLoading = [];
// let hit = false;

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

  //   console.log("this is a flat loadBoard start: ", loadedBoard.flat());

  if (direction === 0) {
    if (y + units < gridSize) {
      for (let i = 0; i < units; i++) {
        let coord = grid[x][y + i];
        // console.log("this is coord: ", coord);

        if (!loadedBoard.flat().includes(coord)) {
          resArr.push(coord);
          // console.log("this is a flat loadedBoard: ", loadedBoard.flat());
        }
      }
    } else {
      return generateShipCoord(grid, units);
    }
  } else {
    if (x + units < gridSize) {
      for (let i = 0; i < units; i++) {
        let coord = grid[x + i][y];
        // console.log("this is coord: ", coord);

        if (!loadedBoard.flat().includes(grid[x + i][y])) {
          resArr.push(coord);
          // console.log("this is a loadedBoard ", loadedBoard.flat());
        }
      }
    } else {
      return generateShipCoord(grid, units);
    }
  }
  // console.log(resArr);
  if (resArr.length !== units) {
    return generateShipCoord(grid, units);
  } else {
    loadedBoard.push(resArr);
    // console.log("the loadedBoard being made: ", loadedBoard);
    // console.log("this is a flat loadedBoard with new ship: ", loadedBoard.flat());
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
    //adding this bracket to problem solve
    // makingAGuess();
    //   }
    //end of problem solving the above already guessed part

    //     //

    for (let i = 0; i < loadedBoard.length; i++) {
      let ship = loadedBoard[i];
      //adding problem solving
      //   shipsLoading.push(ship);
      //   console.log("scanning these ships: ", shipsLoading);
      //     }
      //   }
      //       console.log("We are currently looking at ship: ", ship);
      //       console.log("Does it include userGuess?:", userGuess);
      //

      //   else
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

          //   else {
          //     makingAGuess();
          //   }
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
          //this else added to the makingAGuess
        }
        //   } else {
        //     hit === false;
      }
    }
    // if (loadedBoard[loadedBoard.length - 1] && !ship.includes(userGuess)) {
    //   if (loadedBoard[loadedBoard.length - 1] && hit !== true) {
    if (loadedBoard[loadedBoard.length - 1] && hit === true) {
      console.log("This is hit status: ", hit);
      makingAGuess();
    } else if (
      loadedBoard[loadedBoard.length - 1] &&
      hit === false &&
      loadedBoard.length >= 1
    ) {
      console.log("This is hit status: ", hit);
      //here the code will continue when it gets a miss
      // console.log(
      //   "this is the last ship on the board: ",
      //   loadedBoard[loadedBoard.length - 1]
      // );
      console.log("You have missed!");

      console.log("updated guessArray after miss: ", guessArray);
      makingAGuess();
    }
    //
    //   }
    //   else if (
    //     loadedBoard[loadedBoard.length - 1] &&
    //     !ship.includes(userGuess)
    //   ) {
    //     //here the code will continue when it gets a miss
    //     console.log(
    //       "this is the last ship on the board: ",
    //       loadedBoard[loadedBoard.length - 1]
    //     );
    //     console.log("You have missed!");

    //     console.log("updated guessArray after miss: ", guessArray);
    //     makingAGuess();
    //   }
    // }

    //
  }

  //
  //   console.log("shipsLoading: ", shipsLoading);
  //   shipsLoading = [];
  return guessArray;
};

// logic
function startGame() {
  let userStart = rs.question(`"Press any key to start the game."`);
  //enter in the argument here to change the grid size
  const gridSize = 10;
  const grid = buildGrid(gridSize);
  //   console.log("this is the grid: ", grid);
  const max = grid.length;
  console.log("this is the max: ", max);
  console.log("this is the grid flattened: ", grid.flat());

  twoUnit1 = generateShipCoord(grid, 2);
  threeUnit1 = generateShipCoord(grid, 3);
  threeUnit2 = generateShipCoord(grid, 3);
  fourUnit1 = generateShipCoord(grid, 4);
  fiveUnit1 = generateShipCoord(grid, 5);

  console.log("this is the loaded board: ", loadedBoard);
  // console.log("this is the loaded board boat: ", loadedBoard[0]);
  // console.log("this is the loaded board boat unit: ", loadedBoard[0][0]);
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

/**
 * 
 So this is really crazy. The last time I worked on my project, all of my functions worked and the game played how I wanted it to. I come back and try to run it, it is now not working anymore. I'm wondering if this is a case of sometimes vscode works and sometimes it doesn't, but to be sure I would actually need someone else to look at my code and run please.  It counts every entry as a miss.
||```js



```||
 */
