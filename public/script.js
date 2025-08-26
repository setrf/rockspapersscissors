const choices = document.querySelectorAll('[data-choice]');
const playerChoiceDisplay = document.querySelector('.player-choice');
const computerChoiceDisplay = document.querySelector('.computer-choice');
const resultDisplay = document.querySelector('.result');
const playerScoreDisplay = document.querySelector('.player-score');
const computerScoreDisplay = document.querySelector('.computer-score');

let playerScore = 0;
let computerScore = 0;

const choicesMap = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
  lizard: '🦎',
  spock: '🖖'
};

const rules = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock']
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    const playerChoice = e.target.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    playerChoiceDisplay.textContent = `Your choice: ${choicesMap[playerChoice]}`;
    computerChoiceDisplay.textContent = `Computer's choice: ${choicesMap[computerChoice]}`;
    resultDisplay.textContent = winner;

    if (winner === 'You win!') {
      playerScore++;
    } else if (winner === 'You lose!') {
      computerScore++;
    }

    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
  });
});

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getWinner(player, computer) {
  if (player === computer) {
    return "It's a draw!";
  }

  if (rules[player].includes(computer)) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
}