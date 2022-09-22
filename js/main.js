/*----- constants -----*/
const PLAYER_LOOKUP = {
    '1': {
        name: 'Player 1',
        bankIdx: 13,
        totalWins: 0
    },
    '-1': {
        name: 'Player 2',
        bankIdx: 6,
        totalWins: 0
    }

}


/*----- app's state (variables) -----*/
let turn, board, winner, humanOpponent;
let startingPit = null;


/*----- cached element references -----*/
const infoButtonEl = document.querySelector('img');
const infoWindowEl = document.querySelector('.info-box');
const closeInfoWindowEl = document.getElementById('close');
const playerTurnDisplayEl = document.getElementById('player-turn-msg');
const instructionDisplayEl = document.getElementById('instruction-msg');
const mainEl = document.querySelector('main');
const boardEl = document.getElementById('board');
const player1BankLabelEl = document.getElementById('player1-bank-label');
const player2BankLabelEl = document.getElementById('player2-bank-label');
const winCountsEl = document.getElementById('win-counts');
const resetBtnEl = document.querySelector('button');


/*----- event listeners -----*/
resetBtnEl.addEventListener('click', boardSetUp);
boardEl.addEventListener('click', humanClick);
infoButtonEl.addEventListener('click', showInfo);
closeInfoWindowEl.addEventListener('click', hideInfo);


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
        player1BankLabelEl.innerText = `${PLAYER_LOOKUP[1].name}'s bank`;
        player2BankLabelEl.innerText = `${PLAYER_LOOKUP[-1].name}'s bank`;
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

function humanClick(evt) {
    startingPit = parseInt(evt.target.id.slice(3));
    if (evt.target !== 'board' && board[startingPit] && startingPit !== 13 && startingPit !== 6 && board[startingPit] !== 0) sowSeeds(startingPit);
}

function compOpponent() {
    startingPit = null;
    while (startingPit === 6 || board[startingPit] === 0 || startingPit===null) {
        startingPit = Math.floor(Math.random() * 13);
    }
    console.log(startingPit);
    sowSeeds(startingPit);
    startingPit = null;
}

function sowSeeds(startingPit) {
    let numSeeds = board[startingPit]
    board[startingPit] = 0;
    let idx = startingPit + 1;
    while (numSeeds>0) {
        if (idx>13) idx = idx-14;
        else {
            if (idx === PLAYER_LOOKUP[turn * -1].bankIdx) {
                idx++;
            } else {
                board[idx] = board[idx] + 1;
                numSeeds--;
                if (numSeeds !== 0) idx++;
            }
        }
    }
    if (idx !== PLAYER_LOOKUP[turn].bankIdx) turn *= -1;;
    checkWin();
    render();
}

function checkWin() {
    if (board[0] + board[1] + board[2] + board[3] + board[4] + board[5] === 0 || board[7] + board[8] + board[9] + board[10] + board[11] + board[12] === 0 ) {
        if (board[PLAYER_LOOKUP[1].bankIdx] === board[PLAYER_LOOKUP[-1].bankIdx]) winner = 0;
        else if (board[PLAYER_LOOKUP[1].bankIdx] > board[PLAYER_LOOKUP[-1].bankIdx]) {
            winner = 1;
            PLAYER_LOOKUP[1].totalWins++;
        } else {
            winner = -1;
            PLAYER_LOOKUP[-1].totalWins++;
        }
    }
}

function showInfo() {
    infoWindowEl.classList.remove('hidden');
    playerTurnDisplayEl.classList.add('invisible');
    instructionDisplayEl.classList.add('invisible');
    mainEl.classList.add('invisible');
    resetBtnEl.classList.add('invisible');
}

function hideInfo() {
    infoWindowEl.classList.add('hidden');
    playerTurnDisplayEl.classList.remove('invisible');
    instructionDisplayEl.classList.remove('invisible');
    mainEl.classList.remove('invisible');
    resetBtnEl.classList.remove('invisible');
}

function render() {
    if (winner === null) {
        playerTurnDisplayEl.innerText = `${PLAYER_LOOKUP[turn].name}'s turn`;
        instructionDisplayEl.innerText = 'Select a pit of seeds to sow clockwise to fill your bank'
    } else if (winner === 0) {
        playerTurnDisplayEl.innerText = "It's a tie!";
        instructionDisplayEl.innerText = 'Play again to give it another go!';
    } else {
        playerTurnDisplayEl.innerText = `${PLAYER_LOOKUP[winner].name} wins!`
        instructionDisplayEl.innerText = 'Congratulations!';
        winCountsEl.innerHTML = `${PLAYER_LOOKUP[turn].name}: ${PLAYER_LOOKUP[turn].totalWins} <br> ${PLAYER_LOOKUP[turn * -1].name}: ${PLAYER_LOOKUP[turn * -1].totalWins}`
    }

    board.forEach((pit, idx) => {
        if (!pit) {
            document.getElementById(`pit${idx}`).innerText = '';
            document.getElementById(`pit${idx}`).style.cursor = 'not-allowed';
        } else if (board[idx] === 1) {
            document.getElementById(`pit${idx}`).innerText = `${board[idx]} seed`;
        } else {
            document.getElementById(`pit${idx}`).innerText = `${board[idx]} seeds`;
        }
    });
}

init();