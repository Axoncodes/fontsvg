const svgJSon = require('svgJson')

async function htmlAssist(fontJson) {
  let htmlFileContent = `<html><head>
      <link rel="stylesheet" href="./font.css" />
    </head><body>
  `;
  Object.entries(svgJSon.extractGlyphSets(fontJson)).forEach((glyphs, i) => {
    htmlFileContent += `<i class="${glyphs[0]} rexfontinc"></i>\n`;
  })
  htmlFileContent += `</body></html>`;
  return htmlFileContent
}

module.exports = htmlAssist;