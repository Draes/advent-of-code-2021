const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split("\n")
        .map(line => line.split('').map(Number))
}

function part1(input) {
    const lines = input.length;
    let lowPoints = [];

    for (let i = 0; i < lines; i++) {
        const row = input[i];
        for (let j = 0; j < row.length; j++) {
            const adjacents = [getAdjacent(i, j - 1), getAdjacent(i, j + 1), getAdjacent(i + 1, j), getAdjacent(i - 1, j)];
            if (adjacents.filter(a => a <= row[j]).length === 0) {
                lowPoints.push(row[j]);
            }
        }
    }

    return lowPoints
        .map(a => a + 1)
        .reduce((a, b) => a + b);
}

function getAdjacent(i, j) {
    if (i < 0 || i >= input.length || j < 0 || j >= input[0].length) {
        return 9;
    }
    return input[i][j];
}

function part2(input) {
    let visited = {};
    let basins = [];

    for (let i = 0; i < input.length; i++) {
        const row = input[i];
        for (let j = 0; j < row.length; j++) {
            basins.push(visit(visited, i, j));
        }
    }

    const [m1, m2, m3, ...rest] = basins.sort((a, b) => b - a);
    return m1 * m2 * m3;
}

function inBasin(x, y) {
    if (x < 0 || x >= input.length || y < 0 || y >= input[0].length) {
        return false;
    }
    return input[x][y] < 9;
}

function visit(visited, x, y) {
    const node = [x, y];
    if (node in visited || !inBasin(x, y)) {
        return 0;
    }

    visited[node] = 'x';
    return visit(visited, x, y + 1)
        + visit(visited, x, y - 1)
        + visit(visited, x - 1, y)
        + visit(visited, x + 1, y) + 1;
}


const input = readFile('day09_input.txt');

console.log(`Part 1:  ${part1(input)}`);
console.log(`Part 2:  ${part2(input)}`);

