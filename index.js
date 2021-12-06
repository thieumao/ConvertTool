const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

function printObj(obj, id) {
  for (var key in obj) {
    const currentId = id ? id + '/' + key : key;
    var value = obj[key];
    if (typeof value === 'object') {
      printObj(value, currentId);
    } else {
      console.log(currentId + ' > '+ value);
    }
  }
}

const readJsonFile = async () => {
  const data = await readFileAsync('./en.json', 'utf8');
  printObj(JSON.parse(data), '');
}

readJsonFile();
