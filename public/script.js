const choices = document.querySelectorAll('[data-choice]');
const playerChoiceDisplay = document.querySelector('.player-choice');
const computerChoiceDisplay = document.querySelector('.computer-choice');
const resultDisplay = document.querySelector('.result');

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

    playerChoiceDisplay.textContent = `Your choice: ${choicesMap[playerChoice]}`;
    computerChoiceDisplay.textContent = `Computer's choice: ${choicesMap[computerChoice]}`;
    resultDisplay.textContent = winner;
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
