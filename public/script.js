const choicesEls = document.querySelectorAll('[data-choice]');
const playerChoiceDisplay = document.querySelector('.player-choice');
const computerChoiceDisplay = document.querySelector('.computer-choice');
const resultDisplay = document.querySelector('.result');
const playerScoreDisplay = document.querySelector('.player-score');
const computerScoreDisplay = document.querySelector('.computer-score');
const resetBtn = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;
let lastComputerChoice = null;

const choicesMap = { rock: '✊', paper: '✋', scissors: '✌️' };

// Load saved scores (if any)
try {
  const saved = JSON.parse(localStorage.getItem('rps') || '{}');
  if (typeof saved.playerScore === 'number') playerScore = saved.playerScore;
  if (typeof saved.computerScore === 'number') computerScore = saved.computerScore;
  if (typeof saved.lastComputerChoice === 'string') lastComputerChoice = saved.lastComputerChoice;
} catch (_) {}

updateScore();

function save() {
  try {
    localStorage.setItem('rps', JSON.stringify({
      playerScore,
      computerScore,
      lastComputerChoice,
    }));
  } catch (_) {}
}

function updateScore() {
  playerScoreDisplay.textContent = `Player: ${playerScore}`;
  computerScoreDisplay.textContent = `Computer: ${computerScore}`;
}

function play(playerChoice) {
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

  updateScore();
  save();
}

choicesEls.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const playerChoice = e.currentTarget.dataset.choice;
    play(playerChoice);
  });
});

// Keyboard shortcuts: R/P/S or 1/2/3
document.addEventListener('keydown', (e) => {
  const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  const key = e.key.toLowerCase();
  if (key === 'r' || e.key === '1') play('rock');
  if (key === 'p' || e.key === '2') play('paper');
  if (key === 's' || e.key === '3') play('scissors');
});

// Reset button
resetBtn?.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  lastComputerChoice = null;
  playerChoiceDisplay.textContent = '';
  computerChoiceDisplay.textContent = '';
  resultDisplay.textContent = '';
  updateScore();
  try { localStorage.removeItem('rps'); } catch(_) {}
});

// Slightly smarter computer: avoid repeating last move 70% of the time
function getComputerChoice() {
  const opts = ['rock', 'paper', 'scissors'];
  let choice;
  if (lastComputerChoice && Math.random() < 0.7) {
    const others = opts.filter((o) => o !== lastComputerChoice);
    choice = others[Math.floor(Math.random() * others.length)];
  } else {
    choice = opts[Math.floor(Math.random() * opts.length)];
  }
  lastComputerChoice = choice;
  return choice;
}

function getWinner(player, computer) {
  if (player === computer) return "It's a draw!";
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'You win!';
  }
  return 'You lose!';
}

