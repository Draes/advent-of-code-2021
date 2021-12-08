const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split(",")
        .map(Number);
}

function calcGenerations(input, generations) {
    let fishes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    input.forEach(i => fishes[i] += 1);

    for (let i = 0; i < generations; i++) {
        fishes.push(fishes.shift());
        fishes[6] += fishes[8];
    }
    return fishes.reduce((a, b) => a + b);
}

const input = readFile('day06_input.txt');

console.log(`Part 1:  ${calcGenerations(input, 80)}`);
console.log(`Part 2:  ${calcGenerations(input, 256)}`);