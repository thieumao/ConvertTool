const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

// let dataArray = [];
// function printObj(obj, id) {
//   for (var key in obj) {
//     const currentId = id ? id + '/' + key : key;
//     var value = obj[key];
//     if (typeof value === 'object') {
//       printObj(value, currentId);
//     } else {
//       // console.log(currentId + ' > '+ value);
//       dataArray.push(`"${currentId}","${value}"`);
//     }
//   }
// }

const readJsonFile = async () => {
  const csv = await readFileAsync('./en.csv', 'utf8');
  const viJson = await readFileAsync('./vi.Json', 'utf8');
  const arr = csv.split("\r\n");

  for (const index in arr) {
    const line = arr[index];
    const lineArr = line.split(",");
    const key = lineArr[0];
    const enValue = lineArr[1];
    const viValue = lineArr.length >= 2 ? lineArr[2] : '';
    const keyArr = key.replace('"',"").split('/');
    console.log(keyArr);
  }
  // await writeFileAsync('./en.csv', csv);
  // printObj(JSON.parse(data), '');
  // const header = 'Key,English Version,Vietnamese Version\r\n';
  // const csv = header + dataArray.join('\r\n');
  // console.log(csv);
  // await writeFileAsync('./en.csv', csv);
}

readJsonFile();
