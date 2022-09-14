# App Functionality

## MVP
- As a user, I want to be able to see whose turn it is at the top of the screen.
- As a user, I want instructions at the top telling me what to do (e.g. "select a pit of stones to pick up" or "select a pit to begin placing stones")
- As a user, I want to be able to see where the pieces are so that I can choose where to start my turn
- As a user, I want to see when the game is over and who won.
- As a user, I want a reset button at the bottom so I can play again.
- As a user, I want to be able to click on a pit to pick up the stones then click on another pit to indicate where to start automatically distributing them.

## Icebox
- As a user, I want a running tally of total wins and losses per player.
- As a user, I want the app to randomly pick which player goes first for each game.
- As a user, I want to be able to pick which side of the board is mine.

# Overall UI

- Minimalist clean design or honor ancient roots?
- Board is simple
- Instructions at the top will ensure the user knows what to do.

# Wireframe

<img title="Wireframe of Mancala" alt="wireframe" src="/Mancala_board.drawio.png">

# Pseudocode

- When we start a game of mancala, what needs to happen?
    - **Icebox feature:** Randomly select first player **[firstPlayer()]**
    - Initialize board state **[init()]**
        - Each of the six shared pits should have eight stones
        - Each of the player pits should be empty.
        - Message should show which player goes first.
    - Render the board to the DOM **[render()]**
- When it's a player's turn:
    - The first click indicates from which pit they want to "pick up" the stones.  **[pickStones()]**
        - They should only be able to select a shared pit with stones in it.
    - The second click indicates where the stones will begin to be automatically distributed.  **[dropStones()]**
    - After stones have been distributed, check to see if there is a win state.  **[checkWin()]**
        - If so, change win state.
        - If not, change player turn.
    - Rernder the board to the DOM.  **[render()]**
- When game is over:
    - **Icebox feature:** Update user's running overall score **[updateUserScore()]** 
    - Render DOM with win/lose/tie message **[render()]**
    - Reinitialize board state **[init()]**