# App Functionality

## MVP
- As a user, I want to be able to see whose turn it is at the top of the screen.
- As a user, I want instructions at the top telling me what to do (e.g. "select a pit of seeds to pick up" or "select a pit to begin placing seeds")
- As a user, I want to be able to see where the pieces are so that I can choose where to start my turn
- As a user, I want to see when the game is over and who won.
- As a user, I want a reset button at the bottom so I can play again.
- As a user, I want to be able to click on a pit to pick up the seeds then click on another pit to indicate where to start automatically "sowing" them.
- As a user, I want to see a label so I know which bank is mine.
- As a user, I want to see how many seeds are in each pit.

## Icebox
- As a user, I want a running tally of total wins and losses per player.
- As a user, I want the app to randomly pick which player goes first for each game.
- As a user, I want to be able to pick which side of the board is mine.
- As a user, I want to see a label so I know which side of the board is mine.
- As a user, I want to see individual seed images in each pit (rather than a number)

# Overall UI

- Minimalist clean design or honor ancient roots?
- Board is simple
- Instructions at the top will ensure the user knows what to do.
- Need to label each side of the board by player.

# Wireframe

<img title="Wireframe of Mancala" alt="wireframe" src="/images/Mancala_wireframe.drawio.png">

# Pseudocode

- When we start a game of mancala, what needs to happen?
    - **Icebox feature:** Randomly select first player [``firstPlayer()``]
    - Initialize board state [``init()``]
        - Each of the six shared pits should have four seeds
        - Each of the player banks should be empty.
        - Message should show which player goes first.
    - Render the board to the DOM [``render()``]
- When it's a player's turn:
    - The player clicks on a pit to indicate where they want to "pick up" the seeds.
        - They should only be able to select a shared pit with seeds in it.
        - They can only select a pit on their side of the board. (icebox?)
        - **Icebox feature:** player can only select from pits on their side of the board.
        - The game then automatically starts sowing the seeds at that pit (clockwise) [``sowSeeds()``]
            - ``sowSeeds()`` should skip the opposite player's bank
            - If the last seed is sown in the player's own bank, they get another turn 
            - If the last seed is sown in an empty pit, their turn is over.
    - After seeds have been distributed, check to see if there is a win state.  [``checkWin()``]
        - A win state is defined as no seeds in **any** shared pits.
            - **Icebox feature:** Another way of playing is no seeds in the shared pits on one side of the board, but this seems harder to implement in code.
        - The winner is the player with more seeds in their bank.
            - With 24 seeds total, technically a tie is possible. Can compute this if both players have 12 seeds in bank.
        - If so, change win state.
        - If not, change player turn state.
    - Render the board to the DOM.  [``render()``]
        - **Icebox feature:** 'setInterval' is a method(?) that sets a time interval between iterating functions or something like that. I could use this when updating the # of seeds in each box.
- When game is over:
    - **Icebox feature:** Update user's running overall score [``updateUserScore()``]
    - Render DOM with win/lose/tie message [``render()``]
    - Reinitialize board state [``init()``]

# App's State Data

## Variable Data
- ``turn`` (Whose turn is it?) -- likely an integer (1 or -1)
- ``winner`` -- integer corresponding to player ID (1 or -1); null is no winner (keep playing); tie is calculated if both players have 24 seeds in bank.
- ``board`` -- likely an array. 
    It would get confusing with the two banks, though. but I would designate one index for each player then use a conditional to skip that index based on whose turn it is. Is there a simpler way to do this?
    Or array with objects within? That seems to be a common thing -- would let me label each one. e.g. p1sq1, p1sq2, p1sq3, etc... p1bank, p2sq1, etc.
- ``curPitIdx`` -- an index of the board array of objects corresponding to the current pit for sowing seeds

## Constant Data
- player IDs -- integer (1 or -1) -- stored in an object.

