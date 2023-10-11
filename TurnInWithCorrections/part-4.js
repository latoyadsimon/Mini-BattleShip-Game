//10/04/2023
//Coded by: LaToya Simon
//project started on: 10/01/2023
//project completion with clean up 10/05/2023 02:31am

//06:29am
//fixed this code and is now working as it should to play the game
//using part2-2copyFixing.js as a base for part3-3copy.js
//10/04/23
//at 3:53pm, this code works correctly for the game and displays a visual
//Using part3-3copy.js as a base for part-4.js

/**
🛠 Requirements: Part 4 - Multiplayer (Optional)
Modify the game so you can play against the computer. When the game starts it will automatically position your ships. The computer will then position its own ships.

After you attack and the regular printouts appear, the computer will then attack. It will tell you if you have been hit or missed. The game continues on until someone wins.

Only print the grid for your team on each turn.



💡 Tips:
Break down the project into small, solvable steps. i.e.:
What information about the game should be stored? What kind of variable will it be stored in? (i.e. grid, ships, etc)
What game setup must be set up before a user can take a turn?
What actions can a player take?
What kind of functionality does the game have? Can this functionality be packaged into different functions? (i.e. functions for creating the grid, placing ships, user attack, etc.)
Avoid large functions. A function should be able to perform a single objective effectively. This helps isolate bugs to specific functions and makes your code more readable, modular, and reusable.
 */
//10/05/2023
//was able to finish adding multiplayer with the computer by 2:03am

var rs = require("readline-sync");

//grid builder
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//user input
let userLetter;
let userNumber;
// let guessArray = [];
let playerGuessArray = [];
let compGuessArray = [];
let user = true;

//the gameBoard
let loadedBoard = [];
let playerGame = [];
let compGame = [];

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
  // console.log(resArr);
  if (resArr.length !== units) {
    return generateShipCoord(grid, units);
  } else {
    if (units > 1) {
      loadedBoard.push(resArr);
    }
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
  let guessArray = [];

  playerGrid = [];
  let hit = false;

  if (user === true) {
    guessArray = [...playerGuessArray];
    loadedBoard = playerGame;
    playerGrid = userGrid;
    let guess = userLetter + userNumber;
    userGuess = guess.toUpperCase();
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
  }

  //   //
  else {
    guessArray.push(userGuess);

    if (user === true) {
      playerGuessArray = [...guessArray];
      user = !user;
    } else {
      compGuessArray = [...guessArray];
      user = !user;
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
          if (playerGuessArray.includes(userGuess)) {
            console.log(
              "Player, you have defeated me!!!!! NaaaaaNIIIIII????!!!"
            );
          } else {
            console.log(
              "Computer wins!!!! Nanni Nanni Boo Boo, stick your head in Doo Doo!"
            );
          }
          guessArray = [];
          playerGuessArray = [];
          compGuessArray = [];

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
  //   console.log("this is the grid: ", grid);
  const max = grid.length;
  console.log("this is the max: ", max);
  console.log("this is the grid flattened: ", grid.flat());

  userGrid = buildGridObj2(gridSize);
  console.log("can you see this player!!!!!!");
  console.table(userGrid);

  computerGrid = buildGridObj2(gridSize);
  console.log("can you see this computer!!!!!!");
  console.table(computerGrid);

  function getLoaded() {
    loadedBoard = [];
    twoUnit1 = generateShipCoord(grid, 2);
    threeUnit1 = generateShipCoord(grid, 3);
    threeUnit2 = generateShipCoord(grid, 3);
    fourUnit1 = generateShipCoord(grid, 4);
    fiveUnit1 = generateShipCoord(grid, 5);

    return loadedBoard;
  }

  playerGame = getLoaded();
  compGame = getLoaded();

  console.log("This is playerGame: ", playerGame);
  console.log("This is compGame: ", compGame);

  return grid;
}

function makingAGuess(grid) {
  if (user === true) {
    console.log("Player Turn!!!");
    getLetter(alphabet);
    getNumber();
    makeAGuess(grid);
  } else {
    console.log("Computer Turn!!!");
    makeAGuess(grid);
  }
}

function playGame() {
  startGame();
  makingAGuess();
}

playGame();
