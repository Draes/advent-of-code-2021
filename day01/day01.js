const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split("\n");
}

function part1(input) {
    let increase = 0;
    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i - 1]) {
            increase++;
        }
    }
    return increase;
}

function part2(input) {
    let increase = 0;
    let previous = input[0] + input[1] + input[2];
    for (let i = 1; i < input.length - 2; i++) {
        let current = input[i] + input[i + 1] + input[i + 2];
        if (current > previous) {
            increase++;
        }
        previous = current;
    }
    return increase;
}

const input = readFile('day01_input.txt')
    .map(Number);

console.log(`Part 1:  ${part1(input)}`)
console.log(`Part 2:  ${part2(input)}`)