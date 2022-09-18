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
const pitAndBankEls = document.getElementById('board');
const resetBtnEl = document.querySelector('button');
const message1DisplayEl = document.getElementById('player-turn-msg');


/*----- event listeners -----*/
resetBtnEl.addEventListener('click', init);
pitAndBankEls.addEventListener('click', handleClick);


/*----- functions -----*/
function init() {
    board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    turn = 1;
    render();
}

function handleClick(evt) {
    startingPit = parseInt(evt.target.id.slice(3));
    if (evt.target !== 'board' && board[startingPit] && startingPit !== 13 && startingPit !== 6 && board[startingPit] !== 0) {
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
    if (idx !== PLAYER_LOOKUP[turn].bankIdx) turn *= -1;;
    }
    render();
}

function checkWin() {

}

function render() {
    if (!winner) {
        message1DisplayEl.innerText = `${PLAYER_LOOKUP[turn].name}'s turn`;
    }
    else {
        message1DisplayEl.innerText = `${PLAYER_LOOKUP[winner].name} wins!`
    }

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
