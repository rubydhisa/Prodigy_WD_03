document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = Array.from(document.getElementsByClassName("cell"));
    const status = document.getElementById("status");
    const currentPlayerSpan = document.getElementById("current-player");
    const startGameButton = document.getElementById("start-game");
    const resetGameButton = document.getElementById("reset-game");
    const modeSelector = document.getElementById("mode-selector");

    let boardState = Array(9).fill(null);
    let currentPlayer = 'X';
    let isGameActive = false;
    let gameMode = 'player-vs-player';

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const startGame = () => {
        boardState = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        isGameActive = true;
        currentPlayer = 'X';
        currentPlayerSpan.textContent = currentPlayer;
        updateStatus();
    };

    const handleCellClick = (index) => {
        if (!isGameActive || boardState[index]) return;

        boardState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
        } else if (boardState.every(cell => cell)) {
            status.textContent = "It's a draw!";
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerSpan.textContent = currentPlayer;
            if (gameMode === 'player-vs-ai' && currentPlayer === 'O') {
                aiMove();
            }
        }
    };

    const aiMove = () => {
        const emptyCells = boardState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleCellClick(randomIndex);
    };

    const checkWin = () => {
        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    };

    const updateStatus = () => {
        status.textContent = `Current turn: ${currentPlayer}`;
    };

    const handleCellClickEvent = (event) => {
        const index = event.target.dataset.index;
        handleCellClick(Number(index));
    };

    const resetGame = () => {
        startGame();
    };

    startGameButton.addEventListener("click", () => {
        gameMode = modeSelector.value;
        startGame();
    });

    resetGameButton.addEventListener("click", resetGame);

    cells.forEach(cell => cell.addEventListener("click", handleCellClickEvent));

    startGame(); // Initialize game on page load
});
