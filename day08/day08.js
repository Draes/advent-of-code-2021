const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split("\n")
        .map(line => line.split(' | ')
            .map(l => l.split(' ')
                //sorting all patterns to be the same for the same number
                .map(l => l.split('').sort().join(''))
            ));
}

function part1(input) {
    return input.map(i => {
        const [patterns, output] = i;
        const uniqueLengths = [2, 3, 4, 7];
        return output.filter(o => uniqueLengths.includes(o.length))
            .length;

    }).reduce((a, b) => a + b);
}

function part2(entry) {
    let numbers = {};
    const [patterns, output] = entry;

    // Base cases for 1, 4, 7, 8
    patterns.forEach(p => {
        const len = p.length;
        if (len === 2) {
            numbers[1] = p;
        } else if (len === 3) {
            numbers[7] = p;
        } else if (len === 4) {
            numbers[4] = p;
        } else if (len === 7) {
            numbers[8] = p;
        }
    });

    // finding 6
    numbers[6] = patterns
        .filter(p => p.length === 6)
        .filter(p => arrayDiff(numbers[1], p).length > 0)[0];

    // finding 5
    numbers[5] = patterns
        .filter(p => p.length === 5)
        .filter(p => arrayDiff(numbers[6], p).length === 1)[0];

    // finding 3 and 2
    patterns.filter(p => !Object.values(numbers).includes(p))
        .filter(p => p.length === 5)
        .forEach(p => {
            if (arrayDiff(p, numbers[7]).length === 2) {
                numbers[3] = p;
            } else {
                numbers[2] = p;
            }
        });

    // finding 9 and 0
    patterns.filter(p => !Object.values(numbers).includes(p))
        .filter(p => p.length === 6)
        .forEach(p => {
            if (arrayDiff(p, numbers[5]).length === 1) {
                numbers[9] = p;
            } else {
                numbers[0] = p;
            }
        });

    const outputNumber = output.map(s => findValue(numbers, s)).join('');
    return Number(outputNumber);
}

function arrayDiff(arr1, arr2) {
    return arr1.split('').filter(x => !arr2.split('').includes(x));
}

function findValue(nums, value) {
    return Object.entries(nums)
        .filter(([k, v]) => v === value)
        .map(([k, v]) => k)[0];
}

const input = readFile('day08_input.txt');

console.log(`Part 1:  ${part1(input)}`);

const sum = input.map(i => part2(i))
    .reduce((a, b) => a + b);
console.log(`Part 2:  ${sum}`);

