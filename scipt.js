const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.querySelector('.status-message');
const endScreen = document.getElementById('endScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (!gameBoard[index] && isGameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    showEndScreen(`${currentPlayer} wins!`);
    isGameActive = false;
  } else if (!gameBoard.includes(null)) {
    showEndScreen("It's a draw!");
    isGameActive = false;
  }
}

function showEndScreen(message) {
  resultMessage.textContent = message;
  endScreen.style.display = 'flex';
}

function restartGame() {
  gameBoard.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  endScreen.style.display = 'none';
  statusMessage.textContent = '';
  isGameActive = true;
  currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
newGameButton.addEventListener('click', restartGame);
