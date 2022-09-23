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
let turn, board, winner, timer, humanOpponent;
let startingPit = null;
let lastPit = null;

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
const gameChoiceWindow = document.getElementById('intro');
const humanChoiceEl = document.getElementById('human');
const computerChoiceEl = document.getElementById('computer');
const inputPromptEl = document.getElementById('input-prompt');

/*----- event listeners -----*/
resetBtnEl.addEventListener('click', boardSetUp);
infoButtonEl.addEventListener('click', showInfo);
closeInfoWindowEl.addEventListener('click', hideInfo);
humanChoiceEl.addEventListener('click', chooseHuman);
computerChoiceEl.addEventListener('click', chooseComputer);


/*----- functions -----*/
function init() {

    // implementing this as in-page boxes rather tahn prompts.

    // setTimeout(function () {
    //     let player1Input = prompt("Please enter Player 1's name", 'Player 1');
    //     if (player1Input !== null) PLAYER_LOOKUP[1].name = player1Input;
    //     let player2Input = prompt("Please enter Player 2's name", 'Player 2');
    //     if (player2Input !== null) PLAYER_LOOKUP[-1].name = player2Input;
    //     if (PLAYER_LOOKUP[1].name === PLAYER_LOOKUP[-1].name) {
    //         PLAYER_LOOKUP[-1].name = prompt("Please enter Player 2's name (cannot match Player 1's)");
    //     }
    //     player1BankLabelEl.innerText = `${PLAYER_LOOKUP[1].name}'s bank`;
    //     player2BankLabelEl.innerText = `${PLAYER_LOOKUP[-1].name}'s bank`;
    //     render();
    // }, 200)
}

function chooseHuman() {
    humanOpponent = true;
    enterNames()
}

function chooseComputer() {
    humanOpponent = false;
    enterNames()
}

function enterNames() {
    if (humanOpponent === false) {
        PLAYER_LOOKUP[-1].name = 'Computer';
        inputPromptEl.innerText = 'Enter your name:';
        inputPromptEl.style.gridRow = 'span 2';
        humanChoiceEl.remove();
        computerChoiceEl.remove();
        const name1InputEl = document.createElement('input');
        name1InputEl.setAttribute('type', 'text');
        name1InputEl.style.gridColumn = 'span 2';
        inputPromptEl.insertAdjacentElement('afterend',name1InputEl);
        name1InputEl.focus();

        const name1BtnEl = document.createElement('button');
        name1BtnEl.id = 'small-button';
        name1BtnEl.style.fontSize = '1.4em';
        name1BtnEl.style.gridColumn = 'span 2';
        name1BtnEl.innerHTML = "Let's do this!";
        name1InputEl.insertAdjacentElement('afterend', name1BtnEl);
        name1BtnEl.addEventListener('click', function() {
            PLAYER_LOOKUP[1].name = name1InputEl.value;
            name1InputEl.value = '';
            gameChoiceWindow.style.display = 'none';
            infoButtonEl.classList.remove('invisible');
            playerTurnDisplayEl.classList.remove('invisible');
            instructionDisplayEl.classList.remove('invisible');
            mainEl.classList.remove('invisible');
            resetBtnEl.classList.remove('invisible');
            boardSetUp();
        });
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
              name1BtnEl.click();
            }
          });
    } else {
        inputPromptEl.innerText = "Enter player names:";
        inputPromptEl.style.gridRow = 'span 2';
        humanChoiceEl.remove();
        computerChoiceEl.remove();
        const name1InputEl = document.createElement('input');
        name1InputEl.setAttribute('type', 'text');
        name1InputEl.style.gridColumn = 'span 2';
        inputPromptEl.insertAdjacentElement('afterend',name1InputEl);
        name1InputEl.focus();

        const name2InputEl = document.createElement('input');
        name2InputEl.setAttribute('type', 'text');
        name2InputEl.style.gridColumn = 'span 2';
        name1InputEl.insertAdjacentElement('afterend',name2InputEl);
        
        const name1BtnEl = document.createElement('button');
        name1BtnEl.id = 'small-button';
        name1BtnEl.style.fontSize = '1.4em';
        name1BtnEl.style.gridColumn = 'span 2';
        name1BtnEl.innerHTML = "Let's do this!";
        name2InputEl.insertAdjacentElement('afterend', name1BtnEl);
        name1BtnEl.addEventListener('click', function() {
            PLAYER_LOOKUP[1].name = name1InputEl.value;
            PLAYER_LOOKUP[-1].name = name2InputEl.value;
            if (PLAYER_LOOKUP[1].name === PLAYER_LOOKUP[-1].name) {
                inputPromptEl.innerText = "Player names must be different";
            } else {
                gameChoiceWindow.style.display = 'none';
                infoButtonEl.classList.remove('invisible');
                playerTurnDisplayEl.classList.remove('invisible');
                instructionDisplayEl.classList.remove('invisible');
                mainEl.classList.remove('invisible');
                resetBtnEl.classList.remove('invisible');
                boardSetUp();
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
              name1BtnEl.click();
            }
        });
    }
}

function boardSetUp() {
    clearTimeout(timer);
    board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    winner = null;
    firstPlayer();
    player1BankLabelEl.innerText = `${PLAYER_LOOKUP[1].name}'s bank`;
    player2BankLabelEl.innerText = `${PLAYER_LOOKUP[-1].name}'s bank`;
    render();
    if (humanOpponent === false && turn === -1) timer = setTimeout(compOpponent, 1000);
    else boardEl.addEventListener('click', humanClick);
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
        lastPit = idx;
    }
    checkWin();
}

function nextTurn() {
    if (humanOpponent === false && turn === -1) {
        timer = setTimeout(compOpponent, 1000); 
        boardEl.removeEventListener('click', humanClick);

    }
    if (humanOpponent === true || turn === 1) {
        boardEl.addEventListener('click', humanClick);
    }

}

function checkWin() {
    if (board[0] + board[1] + board[2] + board[3] + board[4] + board[5] === 0 || board[7] + board[8] + board[9] + board[10] + board[11] + board[12] === 0 ) {
        clearTimeout(timer);
        if (board[PLAYER_LOOKUP[1].bankIdx] === board[PLAYER_LOOKUP[-1].bankIdx]) winner = 0;
        else if (board[PLAYER_LOOKUP[1].bankIdx] > board[PLAYER_LOOKUP[-1].bankIdx]) {
            winner = 1;
            PLAYER_LOOKUP[1].totalWins++;
        } else if (board[PLAYER_LOOKUP[1].bankIdx] < board[PLAYER_LOOKUP[-1].bankIdx]) {
            winner = -1;
            PLAYER_LOOKUP[-1].totalWins++;
        }
        boardEl.removeEventListener('click', humanClick);
    } else {
        if (lastPit !== PLAYER_LOOKUP[turn].bankIdx) {
            turn *= -1;
        }   
        nextTurn();
    }
    render();
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
        winCountsEl.innerHTML = `${PLAYER_LOOKUP[winner].name}: ${PLAYER_LOOKUP[winner].totalWins} <br> ${PLAYER_LOOKUP[winner * -1].name}: ${PLAYER_LOOKUP[winner * -1].totalWins}`
    }

    board.forEach((pit, idx) => {
        if (!pit) {
            document.getElementById(`pit${idx}`).innerText = '';
            document.getElementById(`pit${idx}`).style.cursor = 'not-allowed';
        } else if (board[idx] === 1) {
            document.getElementById(`pit${idx}`).innerText = `${board[idx]} seed`;
            document.getElementById(`pit${idx}`).style.cursor = 'pointer';
        } else {
            document.getElementById(`pit${idx}`).innerText = `${board[idx]} seeds`;
            document.getElementById(`pit${idx}`).style.cursor = 'pointer';
        }
    });
}

// init();