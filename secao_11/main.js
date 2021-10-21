const HTMLGenerator = require('./HTMLGenerator');
const fs = require('fs').promises;
const Parser = require('./CsvParser');

async function csvData(filename) {
  const fileData = await fs.readFile(`./${filename}.csv`);

  return Parser(fileData, { columns: true });
};

async function getRecords(){
  const records = await csvData('users');

  return records;
};

async function getHTML(){
  var records = await getRecords();
  var rawHTML = await HTMLGenerator(records, Object.keys(records[0]));

  return rawHTML;
};

async function writeHTML(filename){
  var rawHTML = await getHTML();

  fs.writeFile(`./${filename}.html`, rawHTML)
    .then(() => {
      console.log('Deu bom!');
    })
    .catch(err => {
      console.log(err);
    });
};

writeHTML('users')
