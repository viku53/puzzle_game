let tileSize = 100;
let tilesArray = [...Array(15).keys()].map(i => i + 1).concat(0);
let emptyIndex = 15;
let actionButton = document.getElementById('action-button');
let counter = 0;
let winningText = document.getElementById('winning-text');
let timer;
let timeElapsed = 0;
let container = document.getElementById('puzzle-container');

function startTimer() {
    clearInterval(timer);
    timeElapsed = 0;
    document.getElementById('timer').textContent = `Time: 0s`;
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer').textContent = `Time: ${timeElapsed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function renderTiles() {
    container.innerHTML = '';

    tilesArray.forEach((value, index) => {
        let tile = document.createElement('div');
        tile.className = value === 0 ? 'tile empty' : 'tile';
        tile.textContent = value || '';
        tile.addEventListener('click', () => handleTileMoves(index));

        let row = Math.floor(index / 4);
        let col = index % 4;
        tile.style.top = `${row * tileSize}px`;
        tile.style.left = `${col * tileSize}px`;

        container.appendChild(tile);
    });
}

function handleTileMoves(index) {
    if (isAdjacent(index, emptyIndex)) {
        counter++;
        [tilesArray[emptyIndex], tilesArray[index]] = [tilesArray[index], tilesArray[emptyIndex]];
        emptyIndex = index;
        renderTiles();

        if (isSolved()) {
            stopTimer();
            winningText.innerHTML = `🎉 Congratulations! You completed the puzzle in ${counter} moves and ${timeElapsed} seconds!`;
            winningText.style.display = 'block';
            actionButton.textContent = 'Start New!';
            container.style.pointerEvents = 'none';
            container.style.cursor= 'disabled';
            container.setAttribute('disabled', true)
            window.confetti.startConfetti();
        }
    }
}

function isSolved() {
    for (let i = 0; i < 15; i++) {
        if (tilesArray[i] !== i + 1) return false;
    }
    return true;
}

function isAdjacent(a, b) {
    let rowA = Math.floor(a / 4), colA = a % 4;
    let rowB = Math.floor(b / 4), colB = b % 4;
    return (Math.abs(rowA - rowB) === 1 && colA === colB) || (Math.abs(colA - colB) === 1 && rowA === rowB);
}

function shuffleTiles() {
    counter = 0;
    actionButton.textContent = 'Start Again';
    winningText.style.display = 'none';
    window.confetti.stopConfetti();
    container.style.pointerEvents = 'auto';
    container.style.cursor= 'pointer';
    container.setAttribute('disabled', false)
    startTimer();

    let currentEmpty = emptyIndex;
    for (let i = 0; i < 1000; i++) {
        let possibleMoves = [];
        let row = Math.floor(currentEmpty / 4);
        let col = currentEmpty % 4;

        if (row > 0) possibleMoves.push(currentEmpty - 4);
        if (row < 3) possibleMoves.push(currentEmpty + 4);
        if (col > 0) possibleMoves.push(currentEmpty - 1);
        if (col < 3) possibleMoves.push(currentEmpty + 1);

        let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        [tilesArray[currentEmpty], tilesArray[move]] = [tilesArray[move], tilesArray[currentEmpty]];
        currentEmpty = move;
    }
    emptyIndex = currentEmpty;
    renderTiles();
}

actionButton.addEventListener('click', shuffleTiles);
