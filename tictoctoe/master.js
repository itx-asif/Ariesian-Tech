
let board = Array(9).fill(null);
let currentPlayer = 'X';
const statusElement = document.getElementById('status');
const boardElement = document.getElementById('board');

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkGameStatus()) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    const gameStatus = checkGameStatus();
    if (gameStatus === 'win') {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
    } else if (gameStatus === 'tie') {
        statusElement.textContent = `It's a tie!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkGameStatus() {
// Define all winning combinations
const winConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
];

// Check each winning condition using if-else
if (
(board[0] && board[0] === board[1] && board[0] === board[2]) ||
(board[3] && board[3] === board[4] && board[3] === board[5]) ||
(board[6] && board[6] === board[7] && board[6] === board[8]) ||
(board[0] && board[0] === board[3] && board[0] === board[6]) ||
(board[1] && board[1] === board[4] && board[1] === board[7]) ||
(board[2] && board[2] === board[5] && board[2] === board[8]) ||
(board[0] && board[0] === board[4] && board[0] === board[8]) ||
(board[2] && board[2] === board[4] && board[2] === board[6])
) {
return 'win';
} else if (board.every(cell => cell !== null)) {
return 'tie';
} else {
return null;
}
}


function restartGame() {
    board.fill(null);
    currentPlayer = 'X';
    statusElement.textContent = `Player X's turn`;
    boardElement.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

boardElement.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
});

document.getElementById('restart').addEventListener('click', restartGame);
