const fs = require("fs");

function readFile(filename) {
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .split("\n");

}

function getSegments(input) {
    return input.map(s => s.match(/([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/))
        .map(match => {
            const [_, x1, y1, x2, y2] = match;
            return {
                x1: Number(x1),
                y1: Number(y1),
                x2: Number(x2),
                y2: Number(y2),
            }
        });
}

function applyValue(diagram, tuple) {
    const currentValue = tuple in diagram ? diagram[tuple] : 0;
    diagram[tuple] = currentValue + 1;
}

function applyHorizontally(diagram, x, y1, y2) {
    const iterations = y1 > y2 ? y1 - y2 : y2 - y1;

    for (let i = 0; i <= iterations; i++) {
        applyValue(diagram, [x, y1 < y2 ? y1 + i : y1 - i]);
    }
}

function applyVertically(diagram, y, x1, x2) {
    const iterations = x1 > x2 ? x1 - x2 : x2 - x1;

    for (let i = 0; i <= iterations; i++) {
        applyValue(diagram, [x1 < x2 ? x1 + i : x1 - i, y]);
    }
}

function applyDiagonally(diagram, segment) {
    const {x1, y1, x2, y2} = segment;
    const iterations = x1 > x2 ? x1 - x2 : x2 - x1;

    for (let i = 0; i <= iterations; i++) {
        applyValue(diagram,
            [x1 < x2 ? x1 + i : x1 - i,
                y1 < y2 ? y1 + i : y1 - i]
        )
    }
}

function part1(segments) {
    let diagram = {};
    segments.forEach(segment => {
        const {x1, y1, x2, y2} = segment;

        if (x1 === x2) {
            applyHorizontally(diagram, x1, y1, y2);
        }

        if (y1 === y2) {
            applyVertically(diagram, y1, x1, x2);
        }
    });

    return Object.keys(diagram)
        .map((key) => diagram[key])
        .filter(value => value >= 2)
        .length;
}

function part2(segments) {
    let diagram = {};
    segments.forEach(segment => {
        const {x1, y1, x2, y2} = segment;

        if (x1 === x2) {
            applyHorizontally(diagram, x1, y1, y2);
        } else if (y1 === y2) {
            applyVertically(diagram, y1, x1, x2);
        } else {
            applyDiagonally(diagram, segment);
        }
    });

    return Object.keys(diagram)
        .map((key) => diagram[key])
        .filter(value => value >= 2)
        .length;

}

const input = readFile('day05_input.txt');

const segments = getSegments(input);

console.log(`Part 1:  ${part1(segments)}`)
console.log(`Part 2:  ${part2(segments)}`)