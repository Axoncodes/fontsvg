const classHandler = require('./classHandler');

async function htmlAssist(fontJson) {
  let htmlFileContent = `
    <html>
    <head>
      <link rel="stylesheet" href="./style.css" />
    </head>
    <body>
  `;
  classHandler(fontJson).forEach(htmlClass => {
    htmlFileContent += `<span class="${htmlClass}"></span>\n`;
  })
  htmlFileContent += `
  </body>
  </html>
  `;
  return htmlFileContent
}

module.exports = htmlAssist;