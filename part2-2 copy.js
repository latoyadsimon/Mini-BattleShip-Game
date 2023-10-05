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

    if(direction === 0) {
        if(y + units < gridSize) {
            for(let i = 0; i < units; i++) {
                let alreadyMade = loadedBoard.filter((item) => item === grid[x][y + i]);
                for(let item of loadedBoard) {
                    if(!item.includes(grid[x][y + i])) {
                        resArr.push(grid[x][y + i]);
                    }
                }
            }
        } else {
            return generateShipCoord(grid, units);
        }
    } else {
        if(x + units < gridSize) {
            for(let i = 0; i < units; i++) {
                for(let item of loadedBoard) {

                    if(!item.includes(grid[x+i][y])) {
                        
                        resArr.push(grid[x+i][y]);
                    }
                }
            }
        }else {
            return generateShipCoord(grid, units);
        }
    }
    // console.log(resArr);
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

    if(guessArray.includes(userGuess)) {
        console.log("You have already picked this location. Miss!");
        makingAGuess();
    }else if(!guessArray.includes(userGuess)){
        for(let i = 0; i < loadedBoard.length; i++) {
            let ship = loadedBoard[i];
            if(ship.includes(userGuess)) {
                ship = ship.filter((unit) => unit !== userGuess);
                loadedBoard[i] = ship;
                console.log("You got a hit!!");
                console.log("refreshed loadedBoard ",loadedBoard);
                console.log("hit taken off ship so this remains: ", ship);
                guessArray.push(userGuess);
                console.log('updated guessArray: ', guessArray);
                if(ship.length <1) {
                    loadedBoard = loadedBoard.filter((ship) => ship.length !== 0);
                    console.log("One ship removed from loadedBoard: ", loadedBoard);
                    console.log(`Hit! You have sunk a battleship! ${loadedBoard.length} ship(s) remaining.`);

                    if(loadedBoard.length < 1) {
                        guessArray = [];
                        let win = rs.keyInYN("You have destroyed all battleships. Would you like to play again? Y/N: ", {
                            limitMessage: "select y or n, a rematch is clearly needed, by selecting n, you may go this time, but know that I have won that round by default!"
                        })
                        if(win) {
                            playGame();
                        }
                    }

                    makingAGuess();
                }else{
                    makingAGuess();
                }

            }else{
                console.log("You have missed!");
                guessArray.push(userGuess);
                console.log("updated guessArray after miss: ", guessArray);
                makingAGuess();
            }
        }
    }
    // else {
                // console.log("You have missed!");
                // guessArray.push(userGuess);
                // console.log("updated guessArray after miss: ", guessArray);
                // makingAGuess();
            // }
        






        // loadedBoard.forEach((ship) => {
        //     if(ship.includes(userGuess)) {
        //         console.log("You got a hit!");
        //     }
        // });
    //     let target = null;
    //     let getTarget = loadedBoard.forEach((ship) => {

    //         console.log("this is the userGuess: ", userGuess);
    //         console.log("Here is a ship: ", ship);
    //         // let target = ship.filter((unit) => userGuess === unit);  
    //         if(ship.includes(userGuess)) {
    //             target = userGuess;
    //             console.log("This was a hit: ", userGuess);
                
                

    //         } else {
    //             target = "userGuess wasn't found in the ship"
    //         }
    //         console.log(target);
    //         return target;
    //     })
    //     // let target = getTarget.find((unit) => unit === userGuess); 

    //     console.log("getTarget: ", getTarget);
    //     // console.log("target: ", target);
    //     if(!getTarget) {
    //         console.log("You missed!");
    //         guessArray.push(userGuess);
    //         makingAGuess();
    //     }else{
    //         console.log("You got a hit!");
    //     }
    // }
      
    



    // for(let arr of loadedBoard) {
    //     console.log("This is one array on the loaded board: ", arr)
    //     arr.forEach((item) => {
    //         console.log("these are the potential hits: ", item);

    //          if(guessArray.includes(userGuess)) {
    //         console.log("You have already picked this location. Miss!");
    //         makingAGuess();
    //         } else if(!arr.includes(userGuess)) {
    //         console.log("You have missed!");
    //         console.log(loadedBoard);
    //         guessArray.push(userGuess);
    //         console.log(guessArray);
    //         makingAGuess();
    //     } else if (item == userGuess){
    //         console.log("You got one!");


    //     }
    //     })
        
       
        
        //     arr = arr.filter((shipUnit) => shipUnit !== userGuess);
        //     console.log(arr);
        //     guessArray.push(userGuess);
        //     console.log("this be updated guessArray: ", guessArray);
            // if(arr.length >= 1) {
            //         console.log(`Hit. You have sunk a battleship. ${loadedBoard.length} ship(s) remaining.`);
            //         makingAGuess();
            //     } else {
            //         guessArray = [];
            //         // loadedBoard = [];
            //         let win = rs.keyInYN("You have destroyed all battleships. Would you like to play again? Y/N: ", {
            //             limitMessage: "select y or n, a rematch is clearly needed, by selecting n, you may go this time, but know that I have won that round by default!"
            //         })
            //         if(win) {
            //             playGame();
            //         }
                

                // }
            
        
        // }
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

twoUnit1 = generateShipCoord(grid, 2, gridSize);
threeUnit1 = generateShipCoord(grid, 3, gridSize);
threeUnit2 = generateShipCoord(grid, 3, gridSize);
fourUnit1 = generateShipCoord(grid, 4, gridSize);
fiveUnit1 = generateShipCoord(grid, 5, gridSize);
// console.log(twoUnit1);
// console.log(threeUnit1);
// console.log(threeUnit2);
// console.log(fourUnit1);
// console.log(fiveUnit1);
loadedBoard = [twoUnit1, threeUnit1, threeUnit2, fourUnit1, fiveUnit1];
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


