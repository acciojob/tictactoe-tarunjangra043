document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    if (player1 && player2) {
        document.getElementById('player-input').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.querySelector('.message').innerText = `${player1}, you're up`;
        
        let currentPlayer = player1;
        let currentSymbol = 'X';
        const cells = document.querySelectorAll('.cell');

        cells.forEach(cell => {
            cell.addEventListener('click', function() {
                if (cell.innerText === '') {
                    cell.innerText = currentSymbol;
                    if (checkWinner(currentSymbol)) {
                        document.querySelector('.message').innerText = `${currentPlayer} congratulations, you won!`;
                        cells.forEach(cell => cell.removeEventListener('click', arguments.callee));
                    } else {
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                        currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
                        document.querySelector('.message').innerText = `${currentPlayer}, you're up`;
                    }
                }
            });
        });
    } else {
        alert('Please enter names for both players.');
    }
});

function checkWinner(symbol) {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    const cells = Array.from(document.querySelectorAll('.cell')).reduce((acc, cell) => {
        acc[cell.id] = cell.innerText;
        return acc;
    }, {});

    return winningCombinations.some(combination => 
        combination.every(index => cells[index] === symbol)
    );
}
