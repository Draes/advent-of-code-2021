const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split(",")
        .map(Number);
}

function getMedian(values) {
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    // considering input files are always even
    return values[half];
}

function part1(input) {
    const median = getMedian(input);

    return input
        .map(b => Math.abs(b - median))
        .reduce((a, b) => a + b);
}

function calcFuel(n) {
    if (n <= 1) {
        return n;
    }
    return n + calcFuel(n - 1);
}

function part2(input) {
    const average = input.reduce((a, b) => a + b) / input.length;

    //Since the average might not be an int, you need to test for both the upper and lower int values
    const solutions = [Math.floor(average), Math.round(average)]
        .map(value => input
            .map(b => calcFuel(Math.abs(b - value)))
            .reduce((a, b) => a + b));

    return Math.min(...solutions);
}

const input = readFile('day07_input.txt');

console.log(`Part 1:  ${part1(input)}`);
console.log(`Part 2:  ${part2(input)}`);
