const fs = require('fs');

init();

function init() {
    let data = readFile('submitInput.txt').split('\n');
    let numCases = data.shift();
    let cases = [];
    let i = 0;
    while(numCases) {
        cases[cases.length] = getCases(data[i], data[i + 1].split(' '));
        i+=2;
        numCases--;
    }    
    writeFile('submitOutput.txt',formatContent(cases).join('\n'));
}

function getCases(numRolls, pins) {
    let points = [];
    let acum = 0;
    let frames = 20;
    for(let i = 0; i < frames; i+=2) {        
        let roll1 = parseInt(pins[i]);
        let roll2 = parseInt(pins[i + 1]);
        let roll3 = parseInt(pins[i + 2]);

        if(roll1 === 10) { // Strike
            acum += roll1 + roll2 + roll3;
            points.push(acum)
            i--;
            frames--;
            continue;
        }

        if(roll1 + roll2 === 10) { // Spare            
            acum += roll1 + roll2 + roll3;
            points.push(acum)
            continue;            
        }

        // Normal
        acum = acum + parseInt(roll1) + parseInt(roll2);
        points.push(acum);
    }    
    return points;
}

function formatContent(cases) {
    return cases.map((e, i) => `Case #${i + 1}: ${e.join(' ')}`);
}

function writeFile(file, content) {
    fs.writeFileSync(file, content, 'utf-8');
}

function readFile(file) {
    return fs.readFileSync(file, 'utf-8');
}

