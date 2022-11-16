
const grid = document.querySelector('.container');
const phrase = document.querySelector('#phrase');

const playerFactory = (name, mark, turn) => {
    return {name, mark, turn};
}

const choiceFactory = () => {
    const player1 = [];
    const player2 = [];
    return {player1, player2}
}

const player1 = playerFactory('player1', 'X', true);
const player2 = playerFactory('player2', 'O', false);
const chosen = choiceFactory();
const turns = 0;

const winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let winner = false;

const displayGrid = (gridID, mark) => {
    const gridSquare = document.getElementById(gridID);
    gridSquare.innerHTML = `<p>${mark}</p>`;
}

const winningCompare = (playerArray) => {
    playerArray.sort();
    for(let [index, combo] of winningCombo.entries()) {
        if (combo.every(elem => playerArray.indexOf(elem) > -1)) {         
            winner = true;
        }
    }
    console.log(winner);
}

grid.addEventListener('click', function(e) {
    if(e.target.id != '' && !winner){
        if(!chosen.player1.includes(e.target.id) && !chosen.player2.includes(e.target.id) && player1.turn){
            player1.turn = false;
            player2.turn = true;
            chosen.player1.push(parseInt(e.target.id));
            displayGrid(e.target.id, player1.mark);
            winningCompare(chosen.player1)
            if(winner) phrase.textContent=`${player1.name} has won!`
        }
        else if(!chosen.player1.includes(e.target.id) && !chosen.player2.includes(e.target.id) && player2.turn){
            player1.turn = true;
            player2.turn = false;
            chosen.player2.push(parseInt(e.target.id));
            displayGrid(e.target.id, player2.mark);
            winningCompare(chosen.player2)
            if(winner) phrase.textContent=`${player2.name} has won!`
        }
        //turns++;
    }
})