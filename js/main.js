/*----- constants -----*/
const PLAYER_LOOKUP = {
    '1': {
        name: 'Player1',
        bankIdx: 13
    },
    '-1': {
        name: 'Player2',
        bankIdx: 6
    }

}
// access the current player's info using bracket notation: ``PLAYER_LOOKUP[turn].bankIdx``



/*----- app's state (variables) -----*/
let turn, board, winner, startingPit, clickedPit;

/*----- cached element references -----*/
const pitAndBankEls = document.getElementById('board'); // contains an array of all pit or bank HTML elements
const bankEls = document.querySelectorAll('.banks');
const resetBtnEl = document.querySelector('button');



/*----- event listeners -----*/
// for pit event listeners, include conditional so it does nothing if they choose a bank
// Either this: if ([pit] !==PLAYER_LOOKUP[turn].bankIdx && !==PLAYER_LOOKUP[turn*-1].bankIdx)
// or something based on the DOM element.

resetBtnEl.addEventListener('click', init);
pitAndBankEls.addEventListener('click', handleClick);

/*----- functions -----*/

function init() {
    board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    turn = 1;
}

function handleClick(evt) {
    startingPit = parseInt(evt.target.id.slice(3));
    if (evt.target !== bankEls && board[startingPit] !== 0) sowSeeds(startingPit);  // check is bankEls working?
}

function sowSeeds(startingPit) {
    let numSeeds = board[startingPit]
    board[startingPit] = 0;
    let idx = startingPit + 1;
    while (numSeeds>0) {
        if (idx>13) idx = idx-13;
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
    if (idx !== PLAYER_LOOKUP[turn].bankIdx) turn *= -1;
}

function checkWin() {

}

function render() {

    // Stole this from tic-tac-toe.
    // board.forEach((square, idx) => {
    //     if (square) {
    //         document.getElementById(`pit${idx}`).textContent = board[idx];
    //     } else {
    //         document.getElementById(`pit${idx}`).textContent = '';
    //     }
    // });

}

init();
