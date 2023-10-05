//10/04/2023
//06:29am
//fixed this code and is now working as it should to play the game
//using part2-2copyFixing.js as a base for part3-3copy.js
//10/04/23
//at 3:53pm, this code works correctly for the game and displays a visual
//Using part3-3copy.js as a base for part-4.js

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
// let shipsLoading = [];
let grid = [];
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
    if (units > 1) {
      loadedBoard.push(resArr);
    }
    //adding two players now
    // console.log("the loadedBoard being made: ", loadedBoard);
    // console.log("this is a flat loadedBoard with new ship: ", loadedBoard.flat());
    return resArr;
  }
};

// //this one gives me the table visual i want, items revealed
// // console.log("good table: ");
// const buildGridObj2 = (max) => {
//   const resArr = {};
//   for (let i = 0; i < max; i++) {
//     let letter = alphabet[i];
//     // resArr[i+1] = {};
//     resArr[letter] = {};
//     // resArr[i+1] = [letter][i+1];
//     for (let j = 0; j < max; j++) {
//       // resArr[i+1][j+1] =`${letter}${j + 1}`;
//       resArr[letter][j + 1] = `${letter}${j + 1}`;
//       // resArr[i+1] =`${letter}${j + 1}`;
//     }
//   }
//   // console.log(resArr);
//   return resArr;
// };

// // const grid3 = buildGridObj2(max);
// // console.log(grid3);
// // console.table(grid3);

//let the info be disguised

// console.log("good table: ");
// const buildGridObj3 = (max) => {
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
  //   loadedBoard = [];
  playerGrid = [];
  //   let guess = userLetter + userNumber;
  //   userGuess += guess.toUpperCase();
  //   console.log("the userGuess and guessArray", userGuess, guessArray);
  let hit = false;

  //adding mulitple players
  //   if (
  //     playerGuessArray.length <= compGuessArray ||
  //     playerGuessArray.length < 1
  //   ) {
  //     console.log("Player Turn!");
  //     guessArray = playerGuessArray;
  //     loadedBoard = playerGame;
  //   } else {
  //     console.log("Computer Turn!");
  //     guessArray = compGuessArray;
  //     loadedBoard = compGame;
  //     guess = getRandomInt(grid.length);
  //   }
  //   console.log("as of now: userguess and guess array: ", userGuess, guessArray);
  if (user === true) {
    // console.log("Player Turn!");
    // guessArray += playerGuessArray;
    guessArray = [...playerGuessArray];
    loadedBoard = playerGame;
    playerGrid = userGrid;
    let guess = userLetter + userNumber;
    userGuess = guess.toUpperCase();
    console.log("the userGuess and guessArray", userGuess, guessArray);
    // user = !user;
  } else {
    // console.log("Computer Turn!");
    // guessArray += compGuessArray;
    guessArray = [...compGuessArray];
    loadedBoard = compGame;
    playerGrid = computerGrid;
    let guess = generateShipCoord(grid, 1);
    userGuess = guess[0];
    // userGuess = guess.toUpperCase();
    console.log("the userGuess and guessArray", userGuess, guessArray);
    // user = !user;
  }

  let coord = userGuess.split("");
  if (coord.length > 2) {
    coord[1] = coord[1] + coord[2];
    console.log("coord fixed: ", coord[0], coord[1]);
  }
  //   console.log(
  //     "after swap, this is userguess and guessArray: ",
  //     userGuess,
  //     guessArray
  //   );
  if (guessArray.includes(userGuess)) {
    console.log("You have already picked this location. Miss!");
    user = !user;
    makingAGuess();
  }

  //   //
  else {
    guessArray.push(userGuess);
    // console.log("updated guessArray: ", guessArray);
    if (user === true) {
      //   playerGuessArray += guessArray;
      playerGuessArray = [...guessArray];
      //   guessArray = [];
      user = !user;
    } else {
      compGuessArray = [...guessArray];
      //   guessArray = [];
      user = !user;
    }

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

          //   else {
          //     makingAGuess();
          //   }
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

      //   console.log("this is the grid in the miss: ", grid);
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
        //   playerGuessArray += guessArray;
        //  playerGuessArray = [...guessArray];

        console.log("refreshed computerGrid:");
        console.table(computerGrid);

        // console.table(computerGrid);

        userGrid = playerGrid;
        //   guessArray = [];
        // user = !user;
      } else {
        //  compGuessArray = [...guessArray];
        //   guessArray = [];
        console.log("refreshed userGrid: ");
        // console.table(playerGrid);

        console.table(userGrid);
        computerGrid = playerGrid;
        // user = !user;
      }
      //   console.log("refreshed loadedBoard ", loadedBoard);

      //   console.table(playerGrid);

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

    // loadedBoard.push(twoUnit1, threeUnit1, threeUnit2, fourUnit1, fiveUnit1);
    //needs to be single for error handling to work
    // loadedBoard.push(twoUnit1);
    // loadedBoard.push(threeUnit1);
    // loadedBoard.push(threeUnit2);
    // loadedBoard.push(fourUnit1);
    // loadedBoard.push(fiveUnit1);
    // console.log(loadedBoard);
    return loadedBoard;
  }

  playerGame = getLoaded();
  compGame = getLoaded();

  console.log("This is playerGame: ", playerGame);
  console.log("This is compGame: ", compGame);

  //   console.log("this is the loaded board for the player: ", loadedBoard);

  // console.log("this is the loaded board boat: ", loadedBoard[0]);
  // console.log("this is the loaded board boat unit: ", loadedBoard[0][0]);
  //   return userStart;
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
