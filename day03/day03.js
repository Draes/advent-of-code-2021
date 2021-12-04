const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split("\n");
}

function count(column) {
    let zero = 0;
    let one = 0;

    column.forEach(c => {
        if (c === "0") {
            zero++;
        } else {
            one++;
        }
    });

    return {zero, one};
}

function part1(input) {
    let gamma = '';
    let epsilon = '';

    for (let i = 0; i < input[0].length; i++) {
        const col = input.map(row => row[i]);
        const {zero, one} = count(col);

        if (zero > one) {
            gamma += "0";
            epsilon += "1";
        } else {
            gamma += "1";
            epsilon += "0";
        }
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}


function getOxygenGeneratorRating(input, column) {
    if (input.length <= 1) {
        return input[0];
    }

    const col = input.map(i => i[column]);
    const {zero, one} = count(col);
    //laziest group by ever ¯\_(ツ)_/¯
    const rowsByBit = {
        zero: input.filter(i => i[column] === "0"),
        one: input.filter(i => i[column] === "1")
    }

    return getOxygenGeneratorRating(one >= zero ? rowsByBit.one : rowsByBit.zero, column + 1);
}

function getC02ScrubberRating(input, column) {
    if (input.length <= 1) {
        return input[0];
    }

    const col = input.map(i => i[column]);
    const {zero, one} = count(col);
    //laziest group by ever ¯\_(ツ)_/¯ v2
    const rowsByBit = {
        zero: input.filter(i => i[column] === "0"),
        one: input.filter(i => i[column] === "1")
    }

    return getC02ScrubberRating(one >= zero ? rowsByBit.zero : rowsByBit.one, column + 1);
}

function part2(input) {
    const oxygenRating = getOxygenGeneratorRating(input, 0);
    const co2Rating = getC02ScrubberRating(input, 0);

    return parseInt(oxygenRating, 2) * parseInt(co2Rating, 2);
}

const input = readFile('day03_input.txt');

console.log(`Part 1:  ${part1(input)}`)
console.log(`Part 2:  ${part2(input)}`)