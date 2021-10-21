const fs = require('fs');
const Parser = require('./csvParser');
const HTMLGenerator = require('./HTMLGenerator');

function csvData(filename) {
  fs.createReadStream(`${__dirname}/${filename}.csv`).pipe(Parser);
};

console.log(csvData('users'));


const headers = ['id', 'nome']
const records = [
  {
    id: 1,
    nome: 'Nome1'
  },
  {
    id: 2,
    nome: 'Nome2'
  }
]



