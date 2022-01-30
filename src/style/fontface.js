const xjs = require('@axoncodes/xjs')
const tools = require('../../helpers/tools')

function fontfaceHandler(fontface) {
  let fileContent = '';
  fileContent += `@font-face {\n`
  fileContent += `font-family: "${fontface.attributes['font-family']}";\n`;
  fileContent += `src: url('./font.ttf');\n`;
  fileContent += `}\n`;
  return fileContent;
}

module.exports = fontfaceHandler