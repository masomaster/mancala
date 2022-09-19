/*----- constants -----*/
const PLAYER_LOOKUP = {
    '1': {
        name: 'Player 1',
        bankIdx: 13
    },
    '-1': {
        name: 'Player 2',
        bankIdx: 6
    }

}


/*----- app's state (variables) -----*/
let turn, board, winner, startingPit;


/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const resetBtnEl = document.querySelector('button');
const playerTurnDisplayEl = document.getElementById('player-turn-msg');
const instructionDisplayEl = document.getElementById('instruction-msg');
const player1BankLabelEl = document.getElementById('player1-bank-label');
const player2BankLabelEl = document.getElementById('player2-bank-label');


/*----- event listeners -----*/
resetBtnEl.addEventListener('click', boardSetUp);
boardEl.addEventListener('click', handleClick);



/*----- functions -----*/
function init() {
    boardSetUp();
    setTimeout(function () {
        let player1Input = prompt("Please enter Player 1's name", 'Player 1');
        if (player1Input !== null) PLAYER_LOOKUP[1].name = player1Input;
        let player2Input = prompt("Please enter Player 2's name", 'Player 2');
        if (player2Input !== null) PLAYER_LOOKUP[-1].name = player2Input;
        if (PLAYER_LOOKUP[1].name === PLAYER_LOOKUP[-1].name) {
            PLAYER_LOOKUP[-1].name = prompt("Please enter Player 2's name (cannot match Player 1's)");
        }
        render();
    }, 200)
}

function boardSetUp() {
    board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    winner = null;
    firstPlayer();
    render();
}

function firstPlayer() {
    Math.random() < .5 ? turn = -1 : turn = 1;
}

function handleClick(evt) {
    startingPit = parseInt(evt.target.id.slice(3));
    if (evt.target !== 'board' && board[startingPit] && startingPit !== 13 && startingPit !== 6 && board[startingPit] !== 0) {
        let numSeeds = board[startingPit]
        board[startingPit] = 0;
        let idx = startingPit + 1;
        while (numSeeds>0) {
            if (idx>13) idx = idx-14;
            else {
                if (idx === PLAYER_LOOKUP[turn*-1].bankIdx) {
                    idx++;
                } else {
                    board[idx] = board[idx] + 1;
                    numSeeds--;
                    if (numSeeds !== 0) idx++;
                }
            }
        }
        if (idx !== PLAYER_LOOKUP[turn].bankIdx) turn *= -1;;
    }
    render();
}

function checkWin() {
    if (board[PLAYER_LOOKUP[1].bankIdx] + board[PLAYER_LOOKUP[-1].bankIdx] === 24) {
        if (board[PLAYER_LOOKUP[1].bankIdx] === board[PLAYER_LOOKUP[-1].bankIdx]) winner = 0;
        else if (board[PLAYER_LOOKUP[1].bankIdx] > board[PLAYER_LOOKUP[-1].bankIdx]) winner = 1;
        else winner = -1;
    }
}

function render() {
    if (winner === null) {
        playerTurnDisplayEl.innerText = `${PLAYER_LOOKUP[turn].name}'s turn`;
        instructionDisplayEl.innerText = 'Select a pit of seeds to sow clockwise to fill your bank'
    } else if (winner ===0) {
        playerTurnDisplayEl.innerText = "It's a tie!";
        instructionDisplayEl.innerText = 'Play again to give it another go!';
    } else {
        playerTurnDisplayEl.innerText = `${PLAYER_LOOKUP[winner].name} wins!`
        instructionDisplayEl.innerText = 'Congratulations!';
    }
    
    player1BankLabelEl.innerText = `${PLAYER_LOOKUP[1].name}'s bank`;
    player2BankLabelEl.innerText = `${PLAYER_LOOKUP[-1].name}'s bank`;

    board.forEach((pit, idx) => {
        if (pit) {
            if (board[idx] === 1) {
                document.getElementById(`pit${idx}`).textContent = `${board[idx]} seed`;
            } else {
                document.getElementById(`pit${idx}`).textContent = `${board[idx]} seeds`;
            }
        } else {
            document.getElementById(`pit${idx}`).textContent = '';
        }
    });

}

init();