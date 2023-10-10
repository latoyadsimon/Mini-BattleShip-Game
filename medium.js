//resources:

/**
 * 
console.table():
https://developer.mozilla.org/en-US/docs/Web/API/console/table

readlineSync NPM:
https://www.npmjs.com/package/readline-sync

 */

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

// 1. When the application loads, print the text, "Press any key to start the game."
// //log "Press any key to start the game."

// We will use readlineSync
var rs = require("readline-sync");

rs.question("Press any key to start the game.");

// 2. When the user presses the key, your code will randomly place two different ships in two separate locations on the board. Each ship is only 1 unit long (In the real game ships are 2+ in length).
// //need a click event to start the function
// //randomly have two locations filled on the board. Use number randomizer?

//Ok so for this step, we want to make a board, select two locations randomly to be our opponents ships that we are trying to sink.
//we know that battleship uses letters and numbers on its grid. Go find a youtube video of the game battleship if you are unsure of how to play at this point!

//For our grid, we want to be able to enter in a number as an argument to our grid making function, and it gives us a square grid with corresponding letters and numbers. Using the english alphabet of course, there are only 26 letters we will be working with. If you want the board to be that insanely large, for this example though we will be inputting 10 as our argument and only going up to J.

//we want a function that adds letters to numbers
//I will demonstrate a way using an array and an object, as an added bonus, to visualize our grid, we will be using .flat() method, and .table() method.

//lets make an array of the alphabet.
//An easy way is to use the .split("") method on an alphabet string. We will also add the .toUpperCase() method so it looks nice.

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
console.log(alphabet);

//I find it is easier to use array methods when I want to look for items. In my opinion, the .table() method when used with an object displays better visually in the console. That is why I am choosing to go with both. I am still learning, there may be better ways but I like these two.

//We want groupings for all the letter number combos. For example A1-A9, B1-B9, etc, each should have their own array/object in the master array/object that is our grid like game board. Let's use for loops to accomplish this. It will make a new array/object, then it will loop through our alphabet grid 10 times and add each grid coordinate as it goes.

//--needs to know about template literals
const max = 10;
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

const gameBoard = buildGrid(max);

//when you go to log out gameBoard you will see all of our arrays nicely grouped the way we want them.
console.log(gameBoard);
//adding the .flat() method, it flattens all of our mini arrays into one big one. This will be a lot easier to loop through right? Take a look here.
console.log(gameBoard.flat());
const flatGameBoard = gameBoard.flat();
console.log(flatGameBoard.includes("I5"));

//The next method we are introducing is the .table(). We are using this to show us a table inside of the console. Try it now.
console.table(gameBoard);
//Pretty cool right? Aside from the numbers being based on the index, you might say our visual grid is all but complete. Don't settle for less my friend! A little more research shows that if you use an object, the key and value pairs can be used to title your table!
//We will do the same thing we did with the array, but this time make a grid.

const buildGridObj = (max) => {
  const resObj = {};
  for (let i = 0; i < max; i++) {
    let letter = alphabet[i];
    resObj[letter] = {};
    for (let j = 0; j < max; j++) {
      resObj[letter][j + 1] = `${letter}${j + 1}`;
    }
  }
  return resObj;
};

const playerGrid = buildGridObj(max);
//take a look at the difference between the log and table of playerGrid now and compare it to the above gameBoard.

console.log(playerGrid);
console.table(playerGrid);

// If you go take a look at the mdn resource page for console.table(), take note that it can be used with both arrays and objects. "If data is an array, then its values will be the array indices. If data is an object, then its values will be the property names." Each object key is a letter. Then in each letter object, the key is a number and its value is the letter number combo. Do you understand how that works? If not, please do refer to the resource and read up more on the documentation for console.table().

//arrays and objects both are pretty useful. The main point to draw here is that arrays are easier to loop through for finding data, in my opinion, and objects just look nicer displayed for everyone to see.

//Now we want the board to be randomly loaded with our enemy ships. We will make a function that randomly chooses coordinates. For now each ship will be one unit long and we want two of them. We will use our flatGameBoard to choose the coordinates of our ship
function getRandomInt() {
  return Math.floor(Math.random() * flatGameBoard.length);
}

//We don't want the ships to ever be in the same location, we will compare them before adding them to our game.
let loadedBoard = [];
function getBattleShips() {
  let enemyShip1 = getRandomInt();
  let enemyShip2 = getRandomInt();

  console.log(enemyShip1);
  console.log(enemyShip2);
  if (enemyShip1 === enemyShip2) {
    getBattleShips();
  } else {
    loadedBoard.push(flatGameBoard[enemyShip1]);
    loadedBoard.push(flatGameBoard[enemyShip2]);
  }
  console.log("this is the loadedBoard: ", loadedBoard);
  return "Enemy ships have been loaded!!";
}
getBattleShips();

// 3. The prompt will then say, "Enter a location to strike ie 'A2' "
// //log "Enter a location to strike"
//we can use readlineSync here.

//we want the limit of what the user can choose to be only the letters and numbers we have set. We can use the flatGameBoard variable we created to make sure the user's input matches an item inside of it.

//To get the user's guess

// const userGuess = () => {
//   return rs.question("Enter a location to strike. ie 'A2': ", {
//     limit: flatGameBoard,
//     limitMessage: `choose a letter in the alphabet up to ${
//       alphabet[max - 1]
//     } and a number up to ${max}.`,
//   });
// };

// console.log(userGuess());

//You will find two really interesting things here. Our limit does make sure the user only is able to continue after typing in a coordinate included in our game board

// let guess = userGuess();

// console.log(flatGameBoard.includes(guess));
// console.log(loadedBoard.includes(guess));
// ----------------trying something new

//we can use a readlineSync now to guess
// const userGuess = () => {
//   let guess = rs.question("Enter a location to strike. ie 'A2': ", {
//     limit: flatGameBoard,
//     limitMessage: `choose a letter in the alphabet up to ${
//       alphabet[max - 1]
//     } and a number up to ${max}.`,
//   });
//   return guess;
// };

// // console.log(userGuess());
// let guess = userGuess();
// console.log(loadedBoard.includes(guess));

//the readlineSync captures the input for us but the .includes() doesn't match it up, because the user's input is not case sensitive. So let's make the user's guess uppercase inside of our function.

const userGuess = () => {
  let guess = rs.question("Enter a location to strike. ie 'A2': ", {
    limit: flatGameBoard,
    limitMessage: `choose a letter in the alphabet up to ${
      alphabet[max - 1]
    } and a number up to ${max}.`,
  });

  guess = guess.split("");
  console.log(guess);
  guess[0] = guess[0].toUpperCase();
  console.log(guess);
  guess = guess.join("");
  console.log(guess);

  return guess;
};

// console.log(userGuess());
let guess = userGuess();
console.log(loadedBoard.includes(guess));

//Now that we see it can track the guess down in our loadedBoard array, lets move on to the next problem.

// 4. The user will then enter a location. If there is a ship at that location the prompt will read, "Hit. You have sunk a battleship. 1 ship remaining."
// //have an array that keeps track of the users input
// //have an array that has the randomized locations inside, if the users response is included in the array, log "Hit. You have sunk a battleship"
// //remove hit ship from the array, log out the length of the array
//After each userGuess, lets add it to a guessArray. We also want to mark the guess on the users visual game board. We also want to let them know if they have already entered an input.
let guessArray = [];
function makeAnAttack() {
  if (guessArray.includes(guess)) {
    console.log("You have already picked this location. Miss!!");
    userGuess();
  } else {
    guessArray.push(guess);
    let userAttack = guess.split("");

    if (!loadedBoard.includes(guess)) {
      playerGrid[userAttack[0]][userAttack[1]] = "X";
      console.log("You have missed!!");
      userGuess();
    }
  }
}
