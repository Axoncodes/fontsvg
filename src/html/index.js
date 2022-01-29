const classHandler = require('./classHandler');

async function htmlAssist(fontJson) {
  let htmlFileContent = `
    <html>
    <head>
      <link rel="stylesheet" href="./style.css" />
    </head>
    <body>
  `;
  htmlFileContent += `<div>`
  classHandler(fontJson).forEach(htmlClass => {
    htmlFileContent += `<span class="${htmlClass}"></span>\n`;
  })
  htmlFileContent += `</div>`
  htmlFileContent += `
    </body>
    </html>
  `;
  return htmlFileContent
}

module.exports = htmlAssist;