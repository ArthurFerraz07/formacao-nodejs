function thead(headers){
  var rawHTML = '<tr>';
  headers.forEach(header => {
    rawHTML = rawHTML + `<td>${header}</td>`
  });
  rawHTML = rawHTML + '</tr>';
  return rawHTML;
}

function tbody(records, headers){
  var rawHTML = '';

  records.forEach(record => {
    rawHTML = rawHTML + '<tr>';
    headers.forEach(header => {
      rawHTML = rawHTML + `<td>${record[header]}</td>`
    });
    rawHTML = rawHTML + '</tr>';
  });

  return rawHTML;
}

async function HTMLGenerator(records, headers){
  return `
    <!DOCTYPE html>
    <html lang="en">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Page Title</title>
      <link rel="stylesheet" href="">
      <body>
        <table>
          <thead>
              ${thead(headers)}
            </thead>
            
            <tbody>
              ${tbody(records, headers)}
          </tbody>
        </table>
      </body>
    </html>
  `
}

module.exports = HTMLGenerator;
