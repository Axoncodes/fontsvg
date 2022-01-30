const xjs = require('@axoncodes/xjs')
const tools = require('../../helpers/tools')

function fontfaceHandler(fontface) {
  let fileContent = '';
  fileContent += `@font-face {\n`
  fileContent += `font-family: "${fontface.attributes['font-family']}";\n`;
  fileContent += `src: url('./font.eot'); /* IE9 Compat Modes */\n`;
  fileContent += `src: url('./font.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */\n`;
  fileContent += `url('./font.woff2') format('woff2'), /* Super Modern Browsers */\n`;
  fileContent += `url('./font.woff') format('woff'), /* Pretty Modern Browsers */\n`;
  fileContent += `url('./font.ttf')  format('truetype'), /* Safari, Android, iOS */\n`;
  fileContent += `url('./fontsvg.svg#ifont') format('svg'); /* Legacy iOS */\n`;
  fileContent += `}\n`;
  return fileContent;
}

module.exports = fontfaceHandler