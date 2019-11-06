/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, tableScore, activePlayer, gamePlaying, logSix;

init();

document.querySelector(`.btn-roll`).addEventListener(`click`, () => {

    if (gamePlaying) {

        let dice = Math.floor(Math.random() * 6) + 1;
        let dice1 = Math.floor(Math.random() * 6) + 1;

        const diceDOM = document.querySelectorAll(`.dice`);
        diceDOM[0].style.display = `block`;
        diceDOM[0].src = `dice-${dice}.png`;
        diceDOM[1].style.display = `block`;
        diceDOM[1].src = `dice-${dice1}.png`;

        dice === 6 ? logSix++ : ``;
        dice1 === 6 ? logSix++ : ``;

        if (logSix >= 2) {

            scores[activePlayer] = 0;
            logSix = 0;
            tableScore = 0;

            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
            document.querySelector(`#current-${activePlayer}`).textContent = tableScore;

            nextPlayer();
        } else if (dice !== 1 && dice1 !== 1) {

            tableScore += dice + dice1;

            document.querySelector(`#current-${activePlayer}`).textContent = tableScore;

        } else {

            nextPlayer();
        }

    }
});

document.querySelector(`.btn-hold`).addEventListener(`click`, () => {
    if (gamePlaying) {

        // add cur score to global one
        scores[activePlayer] += tableScore;

        // update UI
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        // check if player win a game
        let maxScore = parseInt(document.querySelector(`#maxScore`).value)

        if (scores[activePlayer] >= maxScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = `Winner!`

            const diceDOM = document.querySelectorAll(`.dice`);
            diceDOM[0].style.display = `none`;

            diceDOM[1].style.display = `none`;


            document.querySelector(`.player-${activePlayer}-panel`).classList.add(`winner`);
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove(`active`);
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(`.btn-new`).addEventListener(`click`, init);

function nextPlayer() {
    logSix = 0;
    tableScore = 0;
    document.querySelector(`#current-${activePlayer}`).textContent = tableScore;

    activePlayer = activePlayer ? 0 : 1;
    document.querySelector(`.player-0-panel`).classList.toggle(`active`);
    document.querySelector(`.player-1-panel`).classList.toggle(`active`);
}

function init() {
    scores = [0, 0];
    logSix = 0;
    activePlayer = 0;
    tableScore = 0;
    gamePlaying = true;

    const diceDOM = document.querySelectorAll(`.dice`);
    diceDOM[0].style.display = `none`;
    diceDOM[1].style.display = `none`;
    document.getElementById(`score-0`).textContent = 0;
    document.getElementById(`score-1`).textContent = 0;
    document.getElementById(`current-0`).textContent = 0;
    document.getElementById(`current-1`).textContent = 0;
    document.querySelector(`#name-1`).textContent = `Player 2`;
    document.querySelector(`#name-0`).textContent = `Player 1`;
    document.querySelector(`.player-1-panel`).classList.remove(`winner`);
    document.querySelector(`.player-0-panel`).classList.remove(`winner`);
    document.querySelector(`.player-1-panel`).classList.remove(`active`);
    document.querySelector(`.player-0-panel`).classList.remove(`active`);
    document.querySelector(`.player-${activePlayer}-panel`).classList.add(`active`);
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/