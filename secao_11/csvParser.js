const parse = require('csv-parse');
const parser = parse({ columns: true }, (err, records) => {
  return records;
});

module.exports = parser;
