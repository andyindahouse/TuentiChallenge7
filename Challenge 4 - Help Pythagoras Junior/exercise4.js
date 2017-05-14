const fs = require('fs');

const file = {
    input: 'submitInput.txt',
    output: 'submitOutput.txt'
};

console.time();
init();
console.timeEnd();

function init() {
    let data = readFile(file.input).split('\n');
    let numCases = data.shift();
    let cases = [];
    let i = 0;
    while(numCases) {
        cases[i] = getCaseResult(data[i].split(' '));
        i++;
        numCases--;
    }
    writeFile(file.output,formatContent(cases).join('\n'));
}

function getCaseResult(sides) {
    let numSides = sides.shift();
    let perimeter = getPerimeters(sides, numSides);
    return isFinite(perimeter) ? perimeter : 'IMPOSSIBLE';
}

function getPerimeters (sides, numSides) {
    let minPerimeter = Infinity;
    let [limitValidForI, limitValidForJ, limitValidForZ] = [numSides - 2, numSides - 1, numSides];
    sides.sort((a, b) => a - b);
    for(let i = 0; i < limitValidForI; i++) {
        if (sides[i] === sides[i - 1]) continue; // valores repetidos de i
        for(let j = i + 1; j < limitValidForJ; j++) {
            if (j != i + 1 && sides[j] === sides[j - 1]) continue; // valores repetidos de j              
            for(let z = j + 1; z < limitValidForZ; z++) {                    
                let [a, b, c] = [parseInt(sides[i], 10), parseInt(sides[j], 10), parseInt(sides[z], 10)];
                if( // Desigualdad triangular
                    a + b > c &&
                    a + b + c < minPerimeter
                ) {
                    minPerimeter = a + b + c;
                    limitValidForI = j;
                    limitValidForJ = z;
                    limitValidForZ = z;     
                }
            }
        }
    }
    return minPerimeter;
}

function formatContent(cases) {
    return cases.map((e, i) => `Case #${i + 1}: ${e}`);
}

function writeFile(file, content) {
    fs.writeFileSync(file, content, 'utf-8');
}

function readFile(file) {
    return fs.readFileSync(file, 'utf-8');
}

