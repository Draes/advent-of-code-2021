const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split("\n");
}

function part1(input) {
    let position = 0;
    let depth = 0;

    input.map(line => line.split(' '))
        .forEach(line => {
            const [command, valueString] = line;
            const value = Number(valueString);
            switch (command) {
                case 'forward':
                    position += value;
                    break;
                case 'down':
                    depth += value;
                    break;
                case 'up':
                    depth -= value;
                    break;
            }
        });

    return position * depth;
}

function part2(input) {
    let position = 0;
    let depth = 0;
    let aim = 0;

    input.map(line => line.split(' '))
        .forEach(line => {
            const [command, valueString] = line;
            const value = Number(valueString);
            switch (command) {
                case 'forward':
                    position += value;
                    depth += aim * value;
                    break;
                case 'down':
                    aim += value;
                    break;
                case 'up':
                    aim -= value;
                    break;
            }
        });

    return position * depth;
}

const input = readFile('day02_input.txt');

console.log(`Part 1:  ${part1(input)}`)
console.log(`Part 2:  ${part2(input)}`)