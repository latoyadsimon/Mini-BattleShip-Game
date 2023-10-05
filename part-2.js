//10/01/23 04:05 am
var rs = require('readline-sync');

/**
 * 
🛠 Requirements: Part 2
Only go to this step when you have successfully finished part 1.

Now we are going to make the game a little more realistic.

1. Rewrite the code so that we use letters A-J and numbers 1-10. This will create a 100 unit grid.
2. If you haven't already, create a function that builds the grid. This function will take a single number argument to build the grid accordingly. (i.e. buildGrid(3) will create a 3x3 grid (9 units), buildGrid(5) will create a 5x5 grid (25 units) buildGrid(10) creates a 10x10 (100 units), etc). 
3. The computer will now place multiple ships in this format:
   1. One two-unit ship
   2. Two three-unit ships
   3. One four-unit ship
   4. One five-unit ship
4. Keep in mind that your code cannot place two ships on intersecting paths
5. Ship placement should be random (horizontally and vertically placed) and not manually placed by you in the code
6. Ships must be placed within the grid boundaries
7. The game works as before, except now, all ships must be destroyed to win
 */
//

//26 characters, so the indexes would be 0-25, alphaChar.length - 1
let alphaChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',' y',' z'];
// console.log(alphaChar.length);
//andrei help
//const alphabet = "abcdefghij".toUpperCase().split("");
//console.log(alphabet)



let randomArray = [];
let guessArray = [];
let userLetter;
let userNumber;
let letters = [];
let grid = [];
let gridEdges = [];
let vertical = [];
let horizontal = [];

//make a shipyard with each ship
//random index to place the ship in random array?
let twoUnit1 = [];
let threeUnit1 = [];
let threeUnit2 = [];
let fourUnit1 = [];
let fiveUnit1 = [];



//grid is made
function gridBuilder(number) {
// let startLetter = alphaChar[0];
// let endLetter = alphaChar[number - 1];
// let sizeOfGrid = number;
// let grid = []; //may need to add this back

// let letters = alphaChar.filter((letter, i) => {
 letters = alphaChar.filter((letter, i) => {
    if(i < number) {
        return letter;
    }
}
);
console.log("these are the letters we will be using: ", letters);

letters.forEach((letter) => {
    for(let i = 1; i <= letters.length; i++) {
        let current = letter + i;
        // console.log(letter + i);
        grid.push(current);
    }
});
// console.log("this should be our grid: ",grid);
return grid;
}
gridBuilder(10);
// gridBuilder(26);
console.log("this should be our grid: ",grid);
// gridBuilder(3);

//grid edge spaces found
function findEdges() {
    let startLetter = letters[0];
    let endLetter = letters[grid.length - 1];
    let startNumber = 1;
    let endNumber = letters.length;
    for(let unit of grid) {
        if(unit.includes(startLetter) || unit.includes(endLetter) || unit.includes(startNumber) || unit.includes(endNumber)) {
            gridEdges.push(unit);
        }
    }
    return gridEdges;
}

let verticalHorizontal =() => {
    //horizontal
    for(let letter of letters) {
        let spacesAlpha = grid.filter((space) => space.includes(letter));
        horizontal.push(spacesAlpha);
    }
    //vertical, goes to how many items in array(up to 10 works)
    for(let i = 0; i < letters.length; i++) {
        let spacesNumeral = grid.filter((space)=> space.includes(i));
        vertical.push(spacesNumeral);
    }
    //includes the number 1
    let spacesNumberl = grid.filter((space)=> space.includes(1) && space.length === 2);
    vertical.push(spacesNumberl);

//     //not working
// //trying to include up to 26 numbers
//     for (let i = 0; letters.length; i++ ) {
//         let space = grid[i];
//         // console.log(space.length);
//         let spaceNumbers = [];
//     // let spaceNumbers = grid.filter((space) => {
//             if(space.length === 2) {
//                 if(space.includes(i)) {
//                     // vertical.push(spaceNumbers);
//                     spaceNumbers.push(space);
//                 }
//             }else if(space.length > 2) {
//                 if(space.includes(i)) {
//                     // vertical.push(spaceNumbers);
//                     spaceNumbers.push(space);
//                 }

//             }
//             vertical.push(spaceNumbers);

//         // })
//     }

    //makes sure different numbers arent included
    vertical = vertical.filter((arr) => arr.length === letters.length);
}

//choose the vertical or horizontal grid
function getBoardPlacement() {
    // let chooseIndex = getRandomInt(2);
    return getRandomInt(2);
    // console.log("this is chooseIndex: ",chooseIndex);


}



// function getBoardPlacement() {
//     let chosenIndex = getRandomInt(2);
//     console.log(chosenIndex);
//     if(chosenIndex === 1) {
//         return horizontal;
//     }else{
//         return vertical;
//     }
// };


//return a random space on the grid

let max = grid.length;
function getRandomInt(max) {
    let battleships = Math.floor(Math.random() * max );
    console.log(battleships);
    return battleships;
}


function randoLocationStart() {
     let chosenRandom = getBoardPlacement();
    console.log("this is chosenRandom: ", chosenRandom);
    
    let chosenRandomArray;
    if (chosenRandom === 1) {
        chosenRandomArray = vertical;
    }else{
        chosenRandomArray = horizontal;
    };

    let numeral = getRandomInt(chosenRandomArray.length);
    let numeral2 = getRandomInt(chosenRandomArray.length);
    console.log("this will be the starting position for the ship: ", chosenRandomArray[numeral][numeral2]);
    return chosenRandomArray[numeral][numeral2];
}


function startGame() {
    let userStart = rs.question(`"Press any key to start the game."`);
    
    // let chosenRandom = getBoardPlacement();
    // console.log("this is chosenRandom: ", chosenRandom);
    
    // let chosenRandomArray;
    // if (chosenRandom === 1) {
    //     chosenRandomArray = vertical;
    // }else{
    //     chosenRandomArray = horizontal;
    // };


    // twoUnit1 = () => {

        // console.log("this is the chosenRandomArray: ", chosenRandomArray);
        
        // let tUnit1 = [];
        // let numeral = getRandomInt(chosenRandomArray.length);
        // twoUnit1[0] = chosenRandomArray[numeral];
        twoUnit1[0] = randoLocationStart();
        console.log("this is the first space in the twoUnit: ", twoUnit1[0]);
        // twoUnit1[1] = chosenRandomArray[tUnit1 + 1];
        // console.log(twoUnit1[1]);
        // return twoUnit1[0], twoUnit1[1];
    // };


    // randomArray.push(twoUnit1);
    // // threeUnit1 = () =>  {
    //     let tUnit2 = chosenRandom;
    //     threeUnit1[0] = chosenRandomArray[tUnit2]; 
    //     threeUnit1[1] = chosenRandomArray[tUnit2+=1];
    //     threeUnit1[2] = chosenRandomArray[tUnit2+=1];
    // // };
    // randomArray.push(threeUnit1);
    // // threeUnit2 = () => {
    //     let thUnit1 = chosenRandom;
    //     threeUnit2[0] = chosenRandomArray[thUnit1]; 
    //     threeUnit2[1] = chosenRandomArray[thUnit1 += 1];
    //     threeUnit2[2] = chosenRandomArray[thUnit1 += 1];
    // // };
    // randomArray.push(threeUnit2);
    // // fourUnit1 = () => {
    //     let foUnit1 = chosenRandom;
    //     fourUnit1[0] = chosenRandomArray[foUnit1]; 
    //     fourUnit1[1] = chosenRandomArray[foUnit1 += 1];
    //     fourUnit1[2] = chosenRandomArray[foUnit1 += 1];
    //     fourUnit1[3] = chosenRandomArray[foUnit1 += 1];
    // // };
    // randomArray.push(fourUnit1);
    // // fiveUnit1 = () => {
    //     let fiUnit1 = chosenRandom;
    //     fiveUnit1[0] = chosenRandomArray[fiUnit1]; 
    //     fiveUnit1[1] = chosenRandomArray[fiUnit1 += 1];
    //     fiveUnit1[2] = chosenRandomArray[fiUnit1 += 1];
    //     fiveUnit1[3] = chosenRandomArray[fiUnit1 += 1];
    //     fiveUnit1[4] = chosenRandomArray[fiUnit1 += 1];
    // // };
    // randomArray.push(fiveUnit1);
    // console.log(randomArray);
    return userStart;
    
}

findEdges();
// console.log("these are the edges: ", findEdges());
verticalHorizontal();
console.log("This is vertical: ", vertical);
console.log("This is horizontal: ", horizontal);
// console.log("this ship will be placed from this array; ", getBoardPlacement());
startGame();
randoLocationStart();