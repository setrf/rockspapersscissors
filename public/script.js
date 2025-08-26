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
  scissors: '✌️'
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    const playerChoice = e.target.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    playerChoiceDisplay.innerHTML = `<span class="choice-animation">${choicesMap[playerChoice]}</span>`;
    computerChoiceDisplay.innerHTML = `<span class="choice-animation">${choicesMap[computerChoice]}</span>`;

    resultDisplay.textContent = winner;
    resultDisplay.classList.remove('winner', 'loser', 'draw');

    if (winner === 'You win!') {
      playerScore++;
      resultDisplay.classList.add('winner');
    } else if (winner === 'You lose!') {
      computerScore++;
      resultDisplay.classList.add('loser');
    } else {
      resultDisplay.classList.add('draw');
    }

    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
  });
});

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getWinner(player, computer) {
  if (player === computer) {
    return "It's a draw!";
  }

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
}
