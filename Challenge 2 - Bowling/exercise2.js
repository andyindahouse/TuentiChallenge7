const fs = require('fs');

init();

function init() {
    let data = readFile('testInput.txt').split('\n');
    let numCases = data.shift();
    let cases = [];
    let i = 0;
    while(numCases) {
        cases[cases.length + 1] = getCases(data[i], data[i + 1].split(' '));
        i+=2;
        numCases--;
    }
}

function getCases(numRolls, pins) {
    let cases = [];
    let acum = 0;    
    for(let i = 0; i < pins.length; i++) {
        acum = acum + parseInt(pins[i], 10) + parseInt(pins[i + 1], 10);
        cases.push(acum);
    }
    console.log(cases);
}

function writeFile(file, content) {
    fs.writeFileSync(file, content, 'utf-8');
}

function readFile(file) {
    return fs.readFileSync(file, 'utf-8');
}

