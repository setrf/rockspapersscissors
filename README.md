# Rock, Paper, Scissors

A fun emoji-based Rock, Paper, Scissors game.

## How to Play

- Choose one of the three options: Rock, Paper, or Scissors.
- The computer will also make a choice.
- The winner is determined by the rules:
  - Rock beats Scissors
  - Scissors beats Paper
  - Paper beats Rock

## Features

- Play against the computer.
- Fun emoji interface.
- Accessible controls with labels and live result announcements.
- Keyboard shortcuts: R, P, S or 1, 2, 3.
- Reset button to clear scores quickly.
- Scores persist between visits (localStorage).
- Slightly smarter computer opponent (avoids repeating the same move often).

## Tips

- You can use the keyboard to play quickly: press R/P/S or 1/2/3.
- Use the Reset button to start fresh; this also clears saved scores.

## Run Locally

- Python: `cd public && python3 -m http.server 8080`
- Node:   `npx serve public -l 8080`
