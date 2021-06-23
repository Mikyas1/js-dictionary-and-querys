// import utils from './utils'
const utile = require('./utils')



// main
let allLines = utile.readFileLineByLine('./test.in');
const NO_OF_TEST_CASES = parseInt(allLines[0]);
allLines.shift();



const prepData = utile.prepareData(allLines, NO_OF_TEST_CASES);
let answer = []

prepData.forEach(p => {
  answer = [...answer, ...utile.Main(p)] 
})

console.log(answer);
utile.save('test.out', answer);