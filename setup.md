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

# Wireframe

<img title="Wireframe of Mancala" alt="wireframe" src="/Mancala_wireframe.drawio.png">

# Pseudocode

- When we start a game of mancala, what needs to happen?
    - **Icebox feature:** Randomly select first player ``firstPlayer()``
    - Initialize board state ``init()``
        - Each of the six shared pits should have eight seeds
        - Each of the player banks should be empty.
        - Message should show which player goes first.
    - Render the board to the DOM ``render()``
- When it's a player's turn:
    - The player clicks on a pit to indicate where they want to "pick up" the seeds.
        - They should only be able to select a shared pit with seeds in it.
        - **Icebox feature:** player can only select from pits on their side of the board.
        - The game then automatically starts sowing the seeds at the next sequential pit (clockwise) ``sowSeeds()``
            - ``sowSeeds()`` should skip the opposite player's bank
            - If the last seed is sown in the player's own bank, they get another turn 
            - If the last seed is sown in a shared pit with seeds in it, the player automatically picks up those seeds and continues sowing. (``sowSeeds()`` from the last pit sown -- no selection necessary);
            - If the last seed is sown in an empty pit, their turn is over.
    - After seeds have been distributed, check to see if there is a win state.  ``checkWin()``
        - A win state is defined as no seeds in the shared pits on one side of the board. (???)
        - The winner 
        - If so, change win state.
        - If not, change player turn state.
    - Render the board to the DOM.  ``render()``
- When game is over:
    - **Icebox feature:** Update user's running overall score ``updateUserScore()`` 
    - Render DOM with win/lose/tie message ``render()``
    - Reinitialize board state ``init()``