const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split("\n");
}

function getRowNumbers(row) {
    return row.trim()
        .split(/ +/)
        .map(Number);
}

function readInput(input) {
    const [numbers, ...boardValues] = input;
    let boards = [];

    for (let i = 0; i < boardValues.length; i += 6) {
        const board = [
            // index i, is always an empty line
            getRowNumbers(boardValues[i + 1]),
            getRowNumbers(boardValues[i + 2]),
            getRowNumbers(boardValues[i + 3]),
            getRowNumbers(boardValues[i + 4]),
            getRowNumbers(boardValues[i + 5])
        ];
        boards.push(board);
    }

    return {
        numbers: numbers.split(',').map(Number),
        boards
    }
}

function checkWin(board) {
    for (let i = 0; i < board.length; i++) {
        let rowMatches = 0;
        let columnMatches = 0;
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === 'X') {
                rowMatches++;
            }
            if (board[j][i] === 'X') {
                columnMatches++;
            }
        }
        if (columnMatches === 5 || rowMatches === 5) {
            return true;
        }
    }

    return false;
}

function markNumber(board, number) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === number) {
                board[i][j] = 'X';
            }
        }
    }
}

function solve(boards, numbers) {
    if (boards.length === 0 || numbers.length === 0) {
        return;
    }

    const [currentNumber, ...rest] = numbers;

    const unfinishedBoards = boards.filter(board => {
        markNumber(board, currentNumber);
        if (checkWin(board)) {
            const unmarkedSum = board.flat()
                .filter(n => n !== 'X')
                .reduce((a, b) => a + b);

            console.log(`${unmarkedSum} * ${currentNumber}: ${unmarkedSum * currentNumber}`);
            return false;
        }
        return true;
    })

    solve(unfinishedBoards, rest);
}

const input = readFile('day04_input.txt');
const problem = readInput(input);

solve(problem.boards, problem.numbers);
