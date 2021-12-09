const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

let dataArray = [];
function printObj(obj, id) {
  for (var key in obj) {
    const currentId = id ? id + '/' + key : key;
    var value = obj[key];
    if (typeof value === 'object') {
      printObj(value, currentId);
    } else {
      // console.log(currentId + ' > '+ value);
      dataArray.push(`"${currentId}","${value}"`);
    }
  }
}

const readJsonFile = async () => {
  const data = await readFileAsync('./en.json', 'utf8');
  printObj(JSON.parse(data), '');
  // const header = 'Key,English Version,Vietnamese Version\r\n';
  // const csv = header + dataArray.join('\r\n');
  const csv = dataArray.join('\r\n');
  console.log(csv);
  await writeFileAsync('./en.csv', csv, 'utf8');
}

readJsonFile();
