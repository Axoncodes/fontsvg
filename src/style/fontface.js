const xjs = require('@axoncodes/xjs')
const tools = require('../../helpers/tools')

function fontfaceHandler(fontface) {
  let fileContent = '';
  fileContent += `@font-face {`
  fileContent += `font-family: "${fontface.attributes['font-family']}";`;
  fileContent += `src: url('./font.ttf');`;
  fileContent += `} `;
  return fileContent;
}

module.exports = fontfaceHandler