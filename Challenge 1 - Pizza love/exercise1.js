const fs = require('fs');

fs.readFile('submitInput.txt', 'utf-8', (err, contentFile) => {
  if(err) {
    console.log('Can\'t open file: ', err);
    return;
  }
  let data = contentFile.split('\n');
  let numCases = data.shift();
  let cases = getCases(numCases, data);
  writeFile('submitOutput.txt',cases);
});

function getCases(cases, data) {
    let i = 1;
    let casesText = [];
    while(cases) {
        casesText[casesText.length] = `Case #${casesText.length + 1}: ${getNumPizzas(data[i - 1], data[i])}`;
        i+=2;
        cases--;
    }
    return casesText.join('\r\n');
}

function getNumPizzas(countMax, line) {
    return Math.ceil(line.split(' ').reduce((pizzas, slices, i) => {
        if(i > countMax - 1) return;
        return parseInt(slices) + pizzas;
    }, 0) / 8);
}

function writeFile(file, content) {
    fs.writeFileSync(file, content, 'utf-8', () => {
        if(err) throw err;
        console.log('It\'s saved!');
    });
}


