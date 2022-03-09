const svgJSon = require('../../../svgjson')

async function htmlAssist(fontJson, suffix) {
  let htmlFileContent = `<html><head>
      <link rel="stylesheet" href="./font${suffix}.css" />
    </head><body>
  `;
  Object.entries(svgJSon.extractGlyphSets(fontJson)).forEach((glyphs, i) => {
    // tag.attributes.unicodeOrder == '0'
    htmlFileContent += `<i class="${glyphs[1][0].attributes["fontsize"] ? 'rx_fontsize' : ''} ${glyphs[1][0].attributes["fill"] ? 'rx_color' : ''} ${glyphs[1][0].attributes["glyph-name"]} rexfontinc"></i>\n`;
  })
  htmlFileContent += `</body></html>`;
  return htmlFileContent
}

module.exports = htmlAssist;