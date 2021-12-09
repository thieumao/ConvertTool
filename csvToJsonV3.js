const _ = require('lodash');
const jp = require('jsonpath');

const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

function chnageValueByPath(object, path, value) {
  if(Array.isArray(path) && path[0] === '$') {
       const pathWithoutFirstElement = path.slice(1);
       _.set(object, pathWithoutFirstElement, value);
  }
}

function changeValuesByPath(object, nodes) {
   nodes.forEach((node)=> {
       chnageValueByPath(object, node.path, node.value);
   })

   return object;
}

const writeJsonFile = async () => {
  const csv = await readFileAsync('./mobile2.csv', 'utf8');
  // let viJson = await readFileAsync('./vi.Json', 'utf8');
  // viJson = JSON.parse(viJson);
  let viJson = {}
  let nodes = jp.apply(viJson, `$..*`, function(value) { return value });
  const arr = csv.split("\r\n");

  for (const index in arr) {
    const line = arr[index];
    const lineArr = line.split(",");
    const key = lineArr[0];
    const enValue = lineArr[1].replace('"',"").replace('"',""); // get english columns
    let viValue = lineArr.length >= 2 ? lineArr[2] : ''; // get vietnamese columns
    let rephraseValue = lineArr.length >= 3 ? lineArr[3] : '';
    let keyArr = key.replace('"',"").replace('"',"").split('/');

    if (rephraseValue) {
      rephraseValue = rephraseValue.replace('"',"").replace('"',"");
    }
    if (viValue) {
      viValue = viValue.replace('"',"").replace('"',"");
    }
    let value = rephraseValue || viValue;
    if (value) {
      _.set(viJson, keyArr, value);
    }
    // _.set(nodes, keyArr, 'Thieu Mao');
  }
  changeValuesByPath(viJson, nodes);
  // console.log(viJson);
  await writeFileAsync('./vi3.json', JSON.stringify(viJson));
}

writeJsonFile();
