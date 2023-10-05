//10/01/23 11:45 pm
var rs = require('readline-sync');

//got some help in javascript q & a with instructor andrei
//resArr is resolution array

//grid builder
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//user input
let userLetter;
let userNumber;
let guessArray= [];

//my battleships
let twoUnit1;
let threeUnit1;
let threeUnit2;
let fourUnit1;
let fiveUnit1;

//the gameBoard
let loadedBoard = [];
//nothing is here to invoke this log...
// console.log("this is the loadedBoard, should b e empty at the start", loadedBoard);

const buildGrid = (max) => {
    const resArr = [];
    for(let i = 0; i < max; i++) {
        resArr.push([]);
        for(let j = 0; j < max; j++) {
            resArr[i].push(`${alphabet[i]}${j + 1}`);
        }
    }
    return resArr;
}

// //enter in the argument here to change the grid size
// const gridSize = 10;
// const grid = buildGrid(gridSize);
// const max = grid.length;

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
    
    //x is horizontal, y is vertical
    //**issue, some coordinates are repeating */

    // console.log("this is a flat tempStorage start: ", tempStorage.flat());
    console.log("this is a flat loadBoard start: ", loadedBoard.flat());

    if(direction === 0) {
        if(y + units < gridSize) {
            for(let i = 0; i < units; i++) {
                let coord = grid[x][y + i];
                console.log("this is coord: ", coord);

                // if(!tempStorage.flat().includes(coord)){
                if(!loadedBoard.flat().includes(coord)){

                

                resArr.push(coord);
                // tempStorage.push(coord);
                // console.log("this is a flat tempStorage: ", tempStorage.flat());
                console.log("this is a flat loadedBoard: ", loadedBoard.flat());
                }
            }
        } else {
            return generateShipCoord(grid, units);
        }
    } else {
        if(x + units < gridSize) {
            for(let i = 0; i < units; i++) {
                let coord = grid[x+i][y];
                console.log("this is coord: ", coord);
                // if(!tempStorage.flat().includes(grid[x+i][y])){
                if(!loadedBoard.flat().includes(grid[x+i][y])){
                resArr.push(coord);
                // tempStorage.push(coord);
                // console.log("this is a flat tempStorage: ", tempStorage.flat());
                console.log("this is a loadedBoard ", loadedBoard.flat());
                }
            }
        }else {
            return generateShipCoord(grid, units);
        }
    }
    // console.log(resArr);
    
    loadedBoard.push(resArr);
    console.log("the loadedBoard being made: ", loadedBoard);
    console.log("this is a flat loadedBoard with new ship: ", loadedBoard.flat());
    return resArr;
}

const getLetter = (alphabet) => {
    userLetter = rs.question("Enter a location to strike. ", {
        limit: alphabet,
        limitMessage: "Choose between a letter else you should admit defeat peasant!"
    })
    return userLetter.toUpperCase();
}

const getNumber = () => {
    userNumber = rs.questionInt("Enter a number. ", {
        limitMessage: "You have to choose a number lest you accept that your garden is overgrown and your cucumbers are soft!!"
    });
    return userNumber;
}

const makeAGuess = () => {
    //  console.log("this is the letter: ", getLetter());
    // console.log("this is the number: ", getNumber());
    let userGuess = "";
    let guess = userLetter + userNumber;
    userGuess += guess.toUpperCase();
    console.log("the userGuess and guessArray", userGuess, guessArray);

    // if(guessArray.includes(userGuess)) {
    //     console.log("You have already picked this location. Miss!");
    //     makingAGuess();
    // }else if(!guessArray.includes(userGuess)){
    //     for(let i = 0; i < loadedBoard.length; i++) {
    //         let ship = loadedBoard[i];
    //         if(ship.includes(userGuess)) {
    //             ship = ship.filter((unit) => unit !== userGuess);
    //             loadedBoard[i] = ship;
    //             console.log("You got a hit!!");
    //             console.log("refreshed loadedBoard ",loadedBoard);
    //             console.log("hit taken off ship so this remains: ", ship);
    //             guessArray.push(userGuess);
    //             console.log('updated guessArray: ', guessArray);
    //             if(ship.length <1) {
    //                 loadedBoard = loadedBoard.filter((ship) => ship.length !== 0);
    //                 console.log("One ship removed from loadedBoard: ", loadedBoard);
    //                 console.log(`Hit! You have sunk a battleship! ${loadedBoard.length} ship(s) remaining.`);

    //                 if(loadedBoard.length < 1) {
    //                     guessArray = [];
    //                     let win = rs.keyInYN("You have destroyed all battleships. Would you like to play again? Y/N: ", {
    //                         limitMessage: "select y or n, a rematch is clearly needed, by selecting n, you may go this time, but know that I have won that round by default!"
    //                     })
    //                     if(win) {
    //                         playGame();
    //                     }
    //                 }

    //                 makingAGuess();
    //             }else{
    //                 makingAGuess();
    //             }

    //         }else{
    //             console.log("You have missed!");
    //             guessArray.push(userGuess);
    //             console.log("updated guessArray after miss: ", guessArray);
    //             makingAGuess();
    //         }
    //     }
    // }
   
    return guessArray;
}


// logic
function startGame() {
    let userStart = rs.question(`"Press any key to start the game."`);
    //enter in the argument here to change the grid size
const gridSize = 10;
const grid = buildGrid(gridSize);
console.log("this is the grid: ", grid);
const max = grid.length;
console.log("this is the max: ", max)
console.log("this is the grid flattened: ", grid.flat());

twoUnit1 = generateShipCoord(grid, 2,);
threeUnit1 = generateShipCoord(grid, 3);
threeUnit2 = generateShipCoord(grid, 3);
fourUnit1 = generateShipCoord(grid, 4);
fiveUnit1 = generateShipCoord(grid, 5);
// console.log(twoUnit1);
// console.log(threeUnit1);
// console.log(threeUnit2);
// console.log(fourUnit1);
// console.log(fiveUnit1);
// loadedBoard = [twoUnit1, threeUnit1, threeUnit2, fourUnit1, fiveUnit1];

console.log("this is the loaded board: ", loadedBoard);
console.log("this is the loaded board boat: ", loadedBoard[0]);
console.log("this is the loaded board boat unit: ", loadedBoard[0][0]);

// makeAGuess();
return userStart;
}


//not available outside of the startGame function
// console.log(twoUnit1);
// console.log(threeUnit1);
// console.log(threeUnit2);
// console.log(fourUnit1);
// console.log(fiveUnit1);

function makingAGuess() {
    getLetter(alphabet);
    getNumber();
    makeAGuess();
};

function playGame() {
    startGame();
    makingAGuess();
    
}

playGame();

// buildGrid(10);
// generateShipCoord(grid, 5);//units is the ship size


