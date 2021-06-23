const fs = require('fs');

const prepareData = (data, NO_OF_TEST_CASES) => {
  let start = 1;
  let end = parseInt(data[0]) + 1;
  const result = [];

  for (let i = 1; i <= NO_OF_TEST_CASES; i++) {
    let inn = end + 1;
    let last = parseInt(data[end]) + inn;
    let x = {
      dictionary: data.slice(start, end),
      query: data.slice(inn,last),
    }
    start = last + 1;
    end = start + parseInt(data[last]);
    result.push(x);
  }

  return result
}

const readFileLineByLine = (file) => {
  try {
    const data = fs.readFileSync(file, 'UTF-8');
    const lines = data.split(/\r?\n/);
    return lines;
  } catch (err) {
      console.error(err);
  }
}


const check = (arr, str1, str2) => {
  let ret = false
  arr.map(a => {
    if (a.includes(str1) && a.includes(str2)) {
      ret = true
    }
  })
  return ret;
}


const Main = (data) => {
  const mainDict = [];
  let ans = [];
  let dict = data.dictionary.map(d => d.toLowerCase().split(' '));
  // console.log(dict)
  
  dict.forEach(d => {
    let str = `${d[0]}=${d[1]}`;
    mainDict.push(str);
  })

  dict.forEach((d) => {
    for(var i = 0; i < mainDict.length; i++) {
      if (mainDict[i].includes(d[0]) || mainDict[i].includes(d[1]) ) {
        mainDict[i] = mainDict[i] + `=${d[0]}=${d[1]}`;
      }
    }   
  })
  
  let query = data.query.map(q => q.toLowerCase().split(' '))

  ans = query.map(q => {
    if (q[0] == q[1]) {
      return `synonyms`;
    } else if (check(mainDict, q[0], q[1])) {
      return `synonyms`
    } else {
      return `different`
    }
  })

  return ans;

}

const save = (file, arr) => {
  var file = fs.createWriteStream(file);
  file.on('error',(err) => { 
    console.log(err);
  });
  arr.forEach((v) => { file.write(v + '\n'); });
  file.end();
}


exports.prepareData = prepareData;
exports.readFileLineByLine =readFileLineByLine;
exports.Main = Main;
exports.save = save;