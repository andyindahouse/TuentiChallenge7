const fs = require('fs');

init();

function init() {
    let data = readFile('submitInput.txt').split('\n');
    let numCases = data.shift();
    let cases = [];
    let i = 0;
    while(numCases) {
        cases[i] = getCases(data[i]);
        i++;
        numCases--;
    }
    writeFile('submitOutput.txt',formatContent(cases).join('\n'));
}

function getCases(P) {
    return parseInt(P).toString(2).length;
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

