const xjs = require('@axoncodes/xjs')
const tools = require('../../helpers/tools')

function fontfaceHandler(fontjson) {
  const fontface = tools.extractFontface(fontjson)
  let fileContent = '';
  fileContent += `@font-face {`
  fileContent += `font-family: "${fontface.attributes.fontname}";`;
  fileContent += `src: url('./font.ttf');`;
  fileContent += `} `;
  return fileContent;
}

module.exports = fontfaceHandler