const gameboard = (() => {

    const playerFactory = (name, mark, turn) => {
        return {name, mark, turn};
    }

    const choiceFactory = () => {
        const player1 = [];
        const player2 = [];
        return {player1, player2};
    }

    const grid = document.querySelector('.container');
    const phrase = document.querySelector('#phrase');
    const winningCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const player1 = playerFactory('player1', 'X', true);
    const player2 = playerFactory('player2', 'O', false);
    const chosen = choiceFactory();
    let turns = 0;
    let winner = false;

    const winningCompare = (playerArray) => {
        playerArray.sort();
        for(let [index, combo] of winningCombo.entries()) {
            if (combo.every(elem => playerArray.indexOf(elem) > -1)) {         
                winner = true;
            }
        }
    }

    const displayGrid = (gridID, mark) => {
        const gridSquare = document.getElementById(gridID);
        gridSquare.innerHTML = `<p>${mark}</p>`;
    }

    const reset = () => {
        player1.turn = true;
        player2.turn = false;
        grid.innerHTML = `<div class="card" id="0"></div>
        <div class="card" id="1"></div>
        <div class="card" id="2"></div>
        <div class="card" id="3"></div>
        <div class="card" id="4"></div>
        <div class="card" id="5"></div>
        <div class="card" id="6"></div>
        <div class="card" id="7"></div>
        <div class="card" id="8"></div>`;
        turns=0;
        chosen.player1 = [];
        chosen.player2 = [];
        phrase.textContent=`Let's Play!`
        winner=false;
    }

    const playerTurn = () => {
        grid.addEventListener('click', function(e) {
            if(e.target.id != '' && !winner){
                if(!chosen.player1.includes(e.target.id) && !chosen.player2.includes(e.target.id) && player1.turn && turns<9){
                    player1.turn = false;
                    player2.turn = true;
                    chosen.player1.push(parseInt(e.target.id));
                    displayGrid(e.target.id, player1.mark);
                    winningCompare(chosen.player1)
                    turns++;
                    console.log(turns)
                    if(winner) phrase.textContent=`${player1.name} has won!`
                }
                else if(!chosen.player1.includes(e.target.id) && !chosen.player2.includes(e.target.id) && player2.turn && turns<9){
                    player1.turn = true;
                    player2.turn = false;
                    chosen.player2.push(parseInt(e.target.id));
                    displayGrid(e.target.id, player2.mark);
                    winningCompare(chosen.player2)
                    turns++;
                    console.log(turns)
                    if(winner) phrase.textContent=`${player2.name} has won!`
                } 
            }
            if(turns === 9 && !winner){
                phrase.textContent = `This was a Draw!`;
            }
        })}
    return { playerTurn, reset }
})();

const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', function(e) {
    gameboard.reset();
})
gameboard.playerTurn();

