const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

let dataArray1 = [];
function printObj1(obj, id) {
  for (var key in obj) {
    const currentId = id ? id + '/' + key : key;
    var value = obj[key];
    if (typeof value === 'object') {
      printObj1(value, currentId);
    } else {
      // console.log(currentId + ' > '+ value);
      dataArray1.push({ id: currentId, value });
    }
  }
}

let dataArray2 = [];
function printObj2(obj, id) {
  for (var key in obj) {
    const currentId = id ? id + '/' + key : key;
    var value = obj[key];
    if (typeof value === 'object') {
      printObj2(value, currentId);
    } else {
      // console.log(currentId + ' > '+ value);
      dataArray2.push({ id: currentId, value });
    }
  }
}

const readJsonFile = async () => {
  const data1 = await readFileAsync('./en.json', 'utf8');
  printObj1(JSON.parse(data1), '');

  const data2 = await readFileAsync('./vi.json', 'utf8');
  printObj2(JSON.parse(data2), '');

  const mergeDataArray = dataArray1.map(item1 => {
    const obj = dataArray2.find(item2 => item2.id === item1.id);
    const newObj = {
      id: item1.id,
      english: item1.value,
      vietnamese: obj?.value || '',
    }
    return newObj;
  });

  const arr = mergeDataArray.map(item => `"${item.id}","${item.english}","${item.vietnamese}"`);
  const csv = arr.join('\r\n');
  await writeFileAsync('./mobile.csv', csv, 'utf8');
}

readJsonFile();
